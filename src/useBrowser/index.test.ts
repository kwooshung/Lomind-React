import { renderHook } from '@testing-library/react-hooks';
import useBrowser from '.';

describe('useBrowser', () => {
  it('应该正确获取浏览器信息', async () => {
    const { result } = renderHook(() => useBrowser());

    expect(result.current.info).toHaveProperty('name');
    expect(result.current.info).toHaveProperty('fullVersion');
    expect(result.current.info).toHaveProperty('majorVersion');
  });
});
