import { useEffect, useState } from 'react';

const useVisible = () => {
  const [isVisible, setVisible] = useState(true);
  const onVisible = () => {
    if (typeof window !== 'undefined') {
      const visible = window.document.visibilityState === 'visible';
      if (isVisible !== visible) setVisible(isVisible);
    }
  };
  const mount = () => {
    if (typeof window !== 'undefined') {
      window.document.addEventListener('visibilitychange', onVisible);
    }
  };
  const onmount = () => {
    if (typeof window !== 'undefined') {
      window.document.removeEventListener('visibilitychange', onVisible);
    }
  };
  useEffect(() => {
    mount();
    return onmount();
  });
  return isVisible;
};

export default useVisible;
