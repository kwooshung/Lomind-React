import { useState } from 'react';
import { isSSR } from 'lomind';
import useMount from '../useMount';

/**
 * @zh 自定义 Hook: 判断是否为服务端渲染
 * @en Custom Hook: Determine if it is server-side rendering
 * @returns {boolean} 是否为服务端渲染
 */
const useIsSSR = (): boolean => {
  const [isServer, setIsServer] = useState<boolean>(true);

  useMount(() => {
    // 在客户端渲染时，useEffect 会在第一次渲染后执行
    setIsServer(isSSR());
  });

  return isServer;
};

export default useIsSSR;
