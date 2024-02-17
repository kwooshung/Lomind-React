import { useEffect } from 'react';

/**
 * @zh 当组件卸载时执行提供的函数
 * @en Execute the provided function when the component is unmounted
 * @param {Function} fn
 */
const useUnmount = (fn: () => void) => {
  useEffect(
    () => () => {
      typeof fn === 'function' && fn();
    },
    []
  );
};

export default useUnmount;
