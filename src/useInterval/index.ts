import { useEffect, useRef } from 'react';
import { createInterval } from 'lomind';

const useTimeout = (callback: () => void, delay: number | null): (() => void) => {
  const clear = useRef<(() => void) | null>(null);

  useEffect(() => {
    delay && (clear.current = createInterval(callback, delay));

    return () => {
      clear.current && clear.current();
    };
  }, [callback, delay]);

  return () => {
    clear.current && clear.current();
  };
};

export default useTimeout;
