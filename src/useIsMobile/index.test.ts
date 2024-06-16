import { renderHook } from '@testing-library/react-hooks';
import useDetector from '../useDetector';
import useIsMobile from '.';

// 模拟 useDetector 模块
vi.mock('../useDetector');

describe('useIsMobile', () => {
  beforeEach(() => {
    // 每次测试前重置所有模拟
    vi.clearAllMocks();
  });

  it('应该返回 true 当设备是移动设备时', () => {
    // 模拟 useDetector 返回的对象
    const mockUseDetector = vi.fn().mockReturnValue({
      isMobile: () => true
    });

    (useDetector as any).mockImplementation(mockUseDetector);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('应该返回 false 当设备不是移动设备时', () => {
    // 模拟 useDetector 返回的对象
    const mockUseDetector = vi.fn().mockReturnValue({
      isMobile: () => false
    });

    (useDetector as any).mockImplementation(mockUseDetector);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
