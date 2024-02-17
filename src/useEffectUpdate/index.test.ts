import { renderHook } from '@testing-library/react-hooks';
import useEffectUpdate from '.';

describe('useEffectUpdate', () => {
  it('不应该在首次渲染时执行', () => {
    const effect = vi.fn();
    renderHook(() => useEffectUpdate(effect));

    expect(effect).toHaveBeenCalledTimes(0);
  });

  it('应该在组件更新时执行', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(() => useEffectUpdate(effect));

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
