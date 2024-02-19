import { useEffect } from 'react';

/**
 * @zh 当组件卸载时执行提供的函数
 * @en Execute the provided function when the component is unmounted
 * @param {Function} fn 需要执行的函数
 * @returns {void} 无返回值
 */
const useUnmount = (fn: () => void): void => {
  useEffect(
    () => () => {
      typeof fn === 'function' && fn();
    },
    []
  );
};

export default useUnmount;
