import { isSSR } from 'lomind';
import useMount from '../useMount';
import useBool from '@/useBool';

/**
 * @zh 自定义 Hook: 判断是否为服务端渲染
 * @en Custom Hook: Determine if it is server-side rendering
 * @returns {boolean} 是否为服务端渲染
 */
const useIsSSR = (): boolean => {
  const [isServer, { set: setIsServer }] = useBool(true);

  useMount(() => {
    setIsServer(isSSR());
  });

  return isServer;
};

export default useIsSSR;
