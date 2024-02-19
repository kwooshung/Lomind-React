import { useEffect } from 'react';

/**
 * @zh 用于在组件挂载时执行的 hook
 * @en Hook for executing when the component is mounted
 * @param {() => void} fn 需要执行的函数
 * @returns {void} 无返回值
 */
const useMount = (fn: () => void): void => {
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
