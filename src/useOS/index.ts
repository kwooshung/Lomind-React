import useMount from '../useMount';
import useDetector from '../useDetector';
import { useState } from 'react';
import { IOSInfo, TOSResult } from './interfaces';

/**
 * @zh 只需要系统信息，可以使用此 Hook；若一个组件中包含 useBrowser、useOs、useIsMobile、useIsTablet，其中任意两个及以上，建议使用 useDetector
 * @en If you only need system information, you can use this Hook; if a component contains useBrowser, useOs, useIsMobile, useIsTablet, any two or more, it is recommended to use useDetector
 * @returns {TOSResult} 系统返回值
 */
const useOS = (): TOSResult => {
  const [osInfo, setOsInfo] = useState<IOSInfo>();
  const [isName, setIsName] = useState<(name: string) => boolean>();
  const [compare, setCompare] = useState<(version: string, operator: '<' | '>' | '=' | '<=' | '>=') => boolean>();

  useMount(() => {
    const det = useDetector();
    setOsInfo(det.osInfo);
    setIsName(det.isOSName);
    setCompare(det.compareOSVersion);
  });

  return { info: osInfo, isName, compare };
};

export default useOS;
