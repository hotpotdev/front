import React from 'react';
import { CSSTransition } from 'react-transition-group';

export type AnimationTransitionProps = {
  children: React.ReactNode;
  nodeRef: React.RefObject<HTMLElement>;
  animationIn?: string;
  animationOut?: string;
  animationInDelay?: number;
  animationOutDelay?: number;
  animationInDuration?: number;
  animationOutDuration?: number;
  isVisible?: boolean;
  style?: object | null;
  className?: string;
  ref?: React.RefObject<CSSTransition<HTMLElement>> | undefined;
};

const AnimationTransition = ({
  animationIn = '', // className
  animationOut = '', // className
  animationInDelay = 0,
  animationOutDelay = 0,
  animationInDuration = 750,
  animationOutDuration = 750,
  isVisible = false,
  style = null,
  className = '',
  children,
  nodeRef,
  ref = undefined
}: AnimationTransitionProps) => {
  return (
    <CSSTransition
      in={isVisible}
      className={` ${className}`}
      appear={false}
      enter={Boolean(animationIn)}
      exit={Boolean(animationOut)}
      style={{
        ...style,
        animationDelay: `${isVisible ? animationInDelay : animationOutDelay}ms`,
        animationDuration: `${isVisible ? animationInDuration : animationInDuration}ms`
      }}
      mountOnEnter
      unmountOnExit
      ref={ref}
      nodeRef={nodeRef}
      timeout={{
        enter: animationInDelay + animationInDuration,
        exit: animationOutDelay + animationOutDuration
      }}
      clsx={{
        appear: isVisible ? `animate-animated` : 'hidden',
        appearActive: isVisible ? `animate-animated ${animationIn}` : 'hidden',
        appearDone: isVisible ? `animate-animated ${animationIn}` : 'hidden',
        enter: `animate-animated ${animationIn}`,
        enterActive: `animate-animated ${animationIn}`,
        enterDone: `animate-animated ${animationIn}`,
        exit: `animate-animated ${animationOut}`,
        exitActive: `animate-animated ${animationOut}`,
        exitDone: `animate-animated ${animationOut}`
      }}
    >
      {children}
    </CSSTransition>
  );
};

export default AnimationTransition;
