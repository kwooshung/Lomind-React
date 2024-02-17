import { renderHook } from '@testing-library/react';
import useUnmount from '.';

describe('useMount', () => {
  it('基础测试', async () => {
    const fn = vi.fn();
    const hook = renderHook(() => useUnmount(fn));
    expect(fn).toBeCalledTimes(0);
    hook.rerender();
    expect(fn).toBeCalledTimes(0);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);
  });

  it('组件卸载时应该执行提供的函数', () => {
    const mockFn = vi.fn();
    const { unmount } = renderHook(() => useUnmount(mockFn));

    // 卸载组件
    unmount();

    // 检查函数是否被调用
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('当未提供函数时不应该抛出错误', () => {
    const testCall = () => {
      const { unmount } = renderHook(() => useUnmount(undefined as unknown as () => void));
      unmount();
    };

    // 确保没有抛出错误
    expect(testCall).not.toThrow();
  });
});
