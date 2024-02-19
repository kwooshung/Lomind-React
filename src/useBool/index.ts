import { useState, useCallback } from 'react';
import { TUseBoolResult } from './interfaces';

/**
 * @zh 用于管理布尔值的 hook
 * @en Hook for managing boolean values
 * @param {boolean} defaultValue 默认值
 * @returns {TUseBoolResult} 返回值
 */
const useBool = (defaultValue: boolean = false): TUseBoolResult => {
  const [state, setState] = useState<boolean>(defaultValue);

  const set = useCallback((value: boolean) => {
    setState(value);
  }, []);

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  return [state, { set, toggle, setTrue, setFalse }];
};

export default useBool;
