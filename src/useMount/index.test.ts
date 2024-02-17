import { renderHook } from '@testing-library/react';
import useMount from '.';

describe('useMount', () => {
  it('基础测试', async () => {
    const fn = vi.fn();
    const hook = renderHook(() => useMount(fn));
    expect(fn).toBeCalledTimes(1);
    hook.rerender();
    expect(fn).toBeCalledTimes(1);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);

    renderHook(() => useMount(fn)).unmount();
    expect(fn).toBeCalledTimes(2);
  });

  it('在组件挂载时应该执行提供的函数', () => {
    const mockFn = vi.fn();
    renderHook(() => useMount(mockFn));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('当未提供函数时不应该抛出错误', () => {
    const testCall = () => {
      renderHook(() => useMount(undefined));
    };

    expect(testCall).not.toThrow();
  });
});
