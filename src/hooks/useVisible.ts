import { useCallback, useEffect, useState } from 'react';

const useVisible = () => {
  const [isVisible, setVisible] = useState(true);
  const onVisible = useCallback(() => {
    if (typeof window !== 'undefined') {
      const visible = window.document.visibilityState === 'visible';
      if (isVisible !== visible) setVisible(visible);
    }
  }, [isVisible])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.document.addEventListener('visibilitychange', onVisible);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.document.removeEventListener('visibilitychange', onVisible);
      }
    };
  }, [onVisible]);

  return isVisible;
};

export default useVisible;
