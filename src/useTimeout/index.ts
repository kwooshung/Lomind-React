import { useEffect, useRef, useCallback } from 'react';

/**
 * @zh 用于管理定时器的 hook
 * @en Hook for managing timers
 * @param {() => void} callback 回调函数
 * @param {number | null} delay 延迟时间
 * @returns {() => void} 清除定时器的函数
 */
const useTimeout = (callback: () => void, delay: number | null): (() => void) => {
  const timeoutId = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  useEffect(() => {
    if (delay !== null) {
      timeoutId.current = window.setTimeout(callback, delay);
    }
    return clear;
  }, [delay, callback, clear]);

  return clear;
};

export default useTimeout;
