import { useEffect, useRef } from 'react';
import { createTimeout } from 'lomind';

const useTimeout = (callback: () => void, delay: number | null): (() => void) => {
  const clear = useRef<(() => void) | null>(null);

  useEffect(() => {
    delay && (clear.current = createTimeout(callback, delay));

    return () => {
      clear.current && clear.current();
    };
  }, [callback, delay]);

  return () => {
    clear.current && clear.current();
  };
};

export default useTimeout;
