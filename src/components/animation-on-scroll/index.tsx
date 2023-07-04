import { useThrottleFn } from 'ahooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const animatedClass = 'animate-animated'; // animate__animated animate css4 (animate-animated windicss)
const serverSide = typeof window === 'undefined';

let scrollableParentRefInitialValue: any;
if (!serverSide) {
  scrollableParentRefInitialValue = window;
}

type Props = {
  offset?: number;
  duration?: number;
  style?: any;
  className?: string;
  initiallyVisible?: boolean;
  animateIn?: string;
  afterAnimatedIn?: any;
  animateOut?: string;
  delay?: number;
  animatePreScroll?: boolean;
  afterAnimatedOut?: any;
  scrollableParentSelector?: string;
  animateOnce?: boolean;
  children?: any;
};

type StyleProp = {
  animationDuration: string;
  opacity?: number;
};

const AnimationOnScroll = ({
  offset = 150,
  duration = 1,
  style: styleProps,
  className: classNameProps,
  initiallyVisible = false,
  animateIn,
  afterAnimatedIn,
  animateOut,
  delay = 0,
  animatePreScroll = true,
  afterAnimatedOut,
  scrollableParentSelector,
  animateOnce = false,
  children
}: Props) => {
  const [classes, setClasses] = useState(animatedClass);
  const [style, setStyle] = useState<StyleProp>({
    animationDuration: `${duration}s`,
    opacity: initiallyVisible ? 1 : 0
  });

  const node: { current: any } = useRef(null);
  const animating = useRef(false);
  const visibilityRef = useRef({ onScreen: false, inViewport: false });

  const delayedAnimationTORef: { current: any } = useRef(undefined);
  const callbackTORef: { current: any } = useRef(undefined);
  const scrollableParentRef: { current: any } = useRef(scrollableParentRefInitialValue);

  const getElementTop = useCallback((elm: any) => {
    let yPos = 0;
    while (elm && elm.offsetTop !== undefined && elm.clientTop !== undefined) {
      yPos += elm.offsetTop + elm.clientTop;
      // eslint-disable-next-line no-param-reassign
      elm = elm.offsetParent;
    }
    return yPos;
  }, []);

  const getScrollPos = useCallback(() => {
    if (scrollableParentRef.current?.pageYOffset !== undefined) {
      return scrollableParentRef.current.pageYOffset;
    }
    return scrollableParentRef.current?.scrollTop;
  }, [scrollableParentRef]);

  const getScrollableParentHeight = useCallback(() => {
    if (scrollableParentRef.current?.innerHeight !== undefined) {
      return scrollableParentRef.current.innerHeight;
    }
    return scrollableParentRef.current?.clientHeight;
  }, [scrollableParentRef]);

  const getViewportTop = useCallback(() => {
    return getScrollPos() + offset;
  }, [offset, getScrollPos]);

  const getViewportBottom = useCallback(() => {
    return getScrollPos() + getScrollableParentHeight() - offset;
  }, [offset, getScrollPos, getScrollableParentHeight]);

  const isInViewport = useCallback(
    (y: number) => {
      return y >= getViewportTop() && y <= getViewportBottom();
    },
    [getViewportTop, getViewportBottom]
  );

  const isAboveViewport = useCallback(
    (y: number) => {
      return y < getViewportTop();
    },
    [getViewportTop]
  );

  const isBelowViewport = useCallback(
    (y: number) => {
      return y > getViewportBottom();
    },
    [getViewportBottom]
  );

  const inViewport = useCallback(
    (elementTop: number, elementBottom: number) => {
      return (
        isInViewport(elementTop) ||
        isInViewport(elementBottom) ||
        (isAboveViewport(elementTop) && isBelowViewport(elementBottom))
      );
    },
    [isInViewport, isAboveViewport, isBelowViewport]
  );

  const isAboveScreen = useCallback(
    (y: number) => {
      return y < getScrollPos();
    },
    [getScrollPos]
  );

  const isBelowScreen = useCallback(
    (y: number) => {
      return y > getScrollPos() + getScrollableParentHeight();
    },
    [getScrollPos, getScrollableParentHeight]
  );

  const onScreen = useCallback(
    (elementTop: number, elementBottom: number) => {
      return !isAboveScreen(elementBottom) && !isBelowScreen(elementTop);
    },
    [isAboveScreen, isBelowScreen]
  );

  const getVisibility = useCallback(() => {
    const elementTop = getElementTop(node.current) - getElementTop(scrollableParentRef.current);
    const elementBottom = elementTop + node.current?.clientHeight;

    return {
      inViewport: inViewport(elementTop, elementBottom),
      onScreen: onScreen(elementTop, elementBottom)
    };
  }, [getElementTop, node, inViewport, onScreen, scrollableParentRef]);

  const visibilityHasChanged = useCallback(
    (previousVis: { inViewport: any; onScreen: any }, currentVis: { inViewport: any; onScreen: any }) => {
      return previousVis.inViewport !== currentVis.inViewport || previousVis.onScreen !== currentVis.onScreen;
    },
    []
  );

  const animate = useCallback(
    (animation: any, callback: () => void) => {
      delayedAnimationTORef.current = setTimeout(() => {
        animating.current = true;
        setClasses(`${animatedClass} ${animation}`);
        setStyle({ animationDuration: `${duration}s` });
        callbackTORef.current = setTimeout(callback, duration * 1000);
      }, delay);
    },
    [animating, delay, duration]
  );

  const animateInTrigger = useCallback(
    (callback: (arg: { inViewport: boolean; onScreen: boolean }) => void) => {
      animate(animateIn, () => {
        if (!animateOnce) {
          setStyle({
            animationDuration: `${duration}s`,
            opacity: 1
          });
          animating.current = false;
        }
        const vis = getVisibility();
        if (callback) {
          callback(vis);
        }
      });
    },
    [animating, animateIn, animateOnce, duration, animate, getVisibility]
  );

  const animateOutTrigger = useCallback(
    (callback: (arg: { inViewport: boolean; onScreen: boolean }) => void) => {
      animate(animateOut, () => {
        setClasses(animatedClass);
        setStyle({ animationDuration: `${duration}s`, opacity: 0 });
        const vis = getVisibility();

        if (vis.inViewport && animateIn) {
          animateInTrigger(afterAnimatedIn);
        } else {
          animating.current = false;
        }

        if (callback) {
          callback(vis);
        }
      });
    },
    [animating, animate, animateIn, duration, afterAnimatedIn, animateInTrigger, animateOut, getVisibility]
  );

  const handleScroll = useCallback(() => {
    if (!animating.current) {
      const { current: visibility } = visibilityRef;
      const currentVis = getVisibility();
      if (visibilityHasChanged(visibility, currentVis)) {
        clearTimeout(delayedAnimationTORef.current);
        if (!currentVis.onScreen) {
          setClasses(animatedClass);
          setStyle({
            animationDuration: `${duration}s`,
            opacity: initiallyVisible ? 1 : 0
          });
        } else if (currentVis.inViewport && animateIn) {
          animateInTrigger(afterAnimatedIn);
        } else if (currentVis.onScreen && visibility.inViewport && animateOut && node.current.style.opacity === '1') {
          animateOutTrigger(afterAnimatedOut);
        }
        visibilityRef.current = currentVis;
      }
    }
  }, [
    afterAnimatedIn,
    afterAnimatedOut,
    animateIn,
    animateInTrigger,
    animateOut,
    duration,
    initiallyVisible,
    visibilityHasChanged,
    animateOutTrigger,
    getVisibility
  ]);

  const { run:listener } = useThrottleFn(()=>{
    handleScroll();
  },{
    wait: 50
  })

  useEffect(() => {
    if (!serverSide) {
      const parentSelector = scrollableParentSelector;
      scrollableParentRef.current = parentSelector ? document.querySelector(parentSelector) : window;
      if (scrollableParentRef.current && scrollableParentRef.current.addEventListener) {
        scrollableParentRef.current.addEventListener('scroll', listener);
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Cannot find element by locator: ${scrollableParentSelector}`);
      }
      if (animatePreScroll) {
        handleScroll();
      }
    }
    return () => {
      if (!serverSide) {
        clearTimeout(delayedAnimationTORef.current);
        clearTimeout(callbackTORef.current);
        if (window && window.removeEventListener) {
          window.removeEventListener('scroll', listener);
        }
      }
    };
  }, [handleScroll, scrollableParentSelector, scrollableParentRef, listener, animatePreScroll]);

  return (
    <div
      ref={node}
      className={classNameProps ? `${classNameProps} ${classes}` : classes}
      style={{ ...style, ...styleProps }}
    >
      {children}
    </div>
  );
};


export default AnimationOnScroll
