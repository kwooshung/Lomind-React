import useDetector from '../useDetector';
import { TOSResult } from './interfaces';

/**
 * @zh 只需要系统信息，可以使用此 Hook；若一个组件中包含 useBrowser、useOs、useIsMobile、useIsTablet，其中任意两个及以上，建议使用 useDetector
 * @en If you only need system information, you can use this Hook; if a component contains useBrowser, useOs, useIsMobile, useIsTablet, any two or more, it is recommended to use useDetector
 * @returns {TOSResult} 系统返回值
 */
const useOS = (): TOSResult => {
  const det = useDetector();
  return { info: det.osInfo, isName: det.isOSName, compare: det.compareOSVersion };
};

export default useOS;
