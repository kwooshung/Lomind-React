import { useEffect, useRef } from 'react';
import { createInterval } from 'lomind';

/**
 * @zh 间隔器 hook，组件卸载时，自动清理定时器
 * @en Interval hook, automatically clean up the timer when the component is unmounted
 * @param {() => void} callback 需要执行的函数
 * @param {number | null} delay 延迟时间（毫秒）
 * @returns {() => void} 清除函数
 */
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
