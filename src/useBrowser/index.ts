import useDetector from '../useDetector';
import { TBrowserResult } from './interfaces';

/**
 * @zh 只需要浏览器信息，可以使用此 Hook；若一个组件中包含 useBrowser、useOs、useIsMobile、useIsTablet，其中任意两个及以上，建议使用 useDetector
 * @en If you only need browser information, you can use this Hook; if a component contains useBrowser, useOs, useIsMobile, useIsTablet, any two or more, it is recommended to use useDetector
 * @returns {TBrowserResult} 浏览器返回值
 */
const useBrowser = (): TBrowserResult => {
  const det = useDetector();
  return { info: det.browserInfo, isName: det.isBrowserName, compare: det.compareBrowserVersion };
};

export default useBrowser;
