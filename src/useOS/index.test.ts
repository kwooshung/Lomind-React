import { renderHook } from '@testing-library/react-hooks';
import useOS from '.';

describe('useOS', () => {
  it('应该正确获取系统信息', async () => {
    const { result } = renderHook(() => useOS());

    // 现在进行断言
    expect(result.current.info).toHaveProperty('name');
    expect(result.current.info).toHaveProperty('version');
    expect(result.current.info).toHaveProperty('platform');
  });
});
