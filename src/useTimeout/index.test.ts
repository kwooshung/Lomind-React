import { renderHook, act } from '@testing-library/react-hooks';
import useTimeout from '.';

describe('useTimeout', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('在指定延迟后执行回调函数', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('清理函数能够取消定时器', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      result.current(); // 执行返回的清理函数
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('在延迟改变时重新设置定时器', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    const { rerender } = renderHook(({ delay }) => useTimeout(callback, delay), {
      initialProps: { delay: 1000 }
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });
    rerender({ delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('在组件卸载时清理定时器', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
