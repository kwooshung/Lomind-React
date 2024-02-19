import { useEffect, useRef } from 'react';

/**
 * @zh 用于在组件更新时执行的 hook
 * @en Hook for executing when the component is updated
 * @param {() => void} effect 需要执行的函数
 * @param {any[]} deps 依赖项
 * @returns {void} 无返回值
 */
const useEffectUpdate: typeof useEffect = (effect: () => void, deps: any[]): void => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, deps);
};

export default useEffectUpdate;
