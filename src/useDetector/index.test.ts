import { renderHook, act } from '@testing-library/react-hooks';
import useDetector from '.';

describe('useDetector', () => {
  it('应该正确获取浏览器信息', () => {
    const { result } = renderHook(() => useDetector());

    expect(result.current.browserInfo).toHaveProperty('name');
    expect(result.current.browserInfo).toHaveProperty('fullVersion');
    expect(result.current.browserInfo).toHaveProperty('majorVersion');
  });

  it('应该正确获取操作系统信息', () => {
    const { result } = renderHook(() => useDetector());
    const osInfo = result.current.osInfo;
    expect(osInfo).toHaveProperty('osName');
    expect(osInfo).toHaveProperty('osVersion');
  });
});
