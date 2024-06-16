import { renderHook } from '@testing-library/react-hooks';
import useDetector from '../useDetector';
import useIsTablet from '.';

// 模拟 useDetector 模块
vi.mock('../useDetector');

describe('useIsTablet', () => {
  beforeEach(() => {
    // 每次测试前重置所有模拟
    vi.clearAllMocks();
  });

  it('应该返回 true 当设备是平板时', () => {
    // 模拟 useDetector 返回的对象
    const mockUseDetector = vi.fn().mockReturnValue({
      isTablet: () => true
    });

    (useDetector as any).mockImplementation(mockUseDetector);

    const { result } = renderHook(() => useIsTablet());
    expect(result.current).toBe(true);
  });

  it('应该返回 false 当设备不是平板时', () => {
    // 模拟 useDetector 返回的对象
    const mockUseDetector = vi.fn().mockReturnValue({
      isTablet: () => false
    });

    (useDetector as any).mockImplementation(mockUseDetector);

    const { result } = renderHook(() => useIsTablet());
    expect(result.current).toBe(false);
  });
});
