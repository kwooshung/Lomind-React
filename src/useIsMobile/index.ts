import useBool from '../useBool';
import useMount from '../useMount';
import useDetector from '../useDetector';

/**
 * @zh 只需要判断是否手机，可以使用此 Hook；若一个组件中包含 useBrowser、useOs、useIsMobile、useIsTablet，其中任意两个及以上，建议使用 useDetector
 * @en If you only need to determine whether it is a mobile phone, you can use this Hook; if a component contains useBrowser, useOs, useIsMobile, useIsTablet, any two or more, it is recommended to use useDetector
 * @returns {boolean} 是否手机
 */
const useIsMobile = (): boolean => {
  const [isMobile, { set: setIsMobile }] = useBool(false);

  useMount(() => {
    const det = useDetector();
    setIsMobile(det.isMobile());
  });

  return isMobile;
};

export default useIsMobile;
