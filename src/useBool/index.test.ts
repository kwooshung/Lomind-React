import { renderHook, act } from '@testing-library/react-hooks';
import useBool from '.';

describe('useBool', () => {
  it('应该使用默认值或 false 初始化', () => {
    const { result: resultWithDefaultFalse } = renderHook(() => useBool());
    expect(resultWithDefaultFalse.current[0]).toBeFalsy();

    const { result: resultWithDefaultTrue } = renderHook(() => useBool(true));
    expect(resultWithDefaultTrue.current[0]).toBeTruthy();
  });

  it('应该能够切换状态', () => {
    const { result } = renderHook(() => useBool());

    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBeTruthy();
  });

  it('应该能够设置状态为真', () => {
    const { result } = renderHook(() => useBool(false));

    act(() => {
      result.current[1].setTrue();
    });

    expect(result.current[0]).toBeTruthy();
  });

  it('应该能够设置状态为假', () => {
    const { result } = renderHook(() => useBool(true));
    act(() => {
      result.current[1].setFalse();
    });
    expect(result.current[0]).toBeFalsy();
  });

  it('应该能够设置特定的状态值', () => {
    const { result } = renderHook(() => useBool());

    act(() => {
      result.current[1].set(true);
    });
    expect(result.current[0]).toBeTruthy();

    act(() => {
      result.current[1].set(false);
    });
    expect(result.current[0]).toBeFalsy();
  });
});
