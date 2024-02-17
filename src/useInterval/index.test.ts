import { renderHook, act } from '@testing-library/react-hooks';
import useInterval from '.';

describe('useInterval', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('周期性地执行回调函数', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    renderHook(() => useInterval(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(5000); // 快进时间，确保回调被多次调用
    });
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('清理函数能够取消定时器', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    const { result } = renderHook(() => useInterval(callback, 1000));

    act(() => {
      result.current(); // 执行返回的清理函数
      vi.advanceTimersByTime(3000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('在延迟改变时重新设置定时器', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), {
      initialProps: { delay: 1000 }
    });

    act(() => {
      vi.advanceTimersByTime(3000); // 快进时间，确保回调被调用
    });
    expect(callback).toHaveBeenCalledTimes(3);

    rerender({ delay: 2000 });

    act(() => {
      vi.advanceTimersByTime(4000); // 快进时间，确保回调被调用
    });
    expect(callback).toHaveBeenCalledTimes(5); // 总共被调用 5 次
  });

  it('在组件卸载时清理定时器', async () => {
    const callback = vi.fn();
    vi.useFakeTimers();

    const { unmount } = renderHook(() => useInterval(callback, 1000));

    unmount();
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
