import clsx from 'clsx';
import { useEffect } from 'react';

const useHtmlClassName = (className?: string) => {
  useEffect(() => {
    if (typeof window != 'undefined' && className && !document.documentElement.className.includes(className)) {
      document.documentElement.className = clsx(className, document.documentElement.className);
    }
  }, [className]);
};

export default useHtmlClassName;
