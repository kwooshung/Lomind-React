import { renderHook, act } from '@testing-library/react-hooks';
import useTheme from '.';

let mockTheme = 'light';
const mockThemes = ['light', 'dark'];

// 模拟 theme 对象
vi.mock('lomind', () => ({
  themes: {
    getInstance: vi.fn().mockImplementation(() => ({
      getCurrent: vi.fn().mockReturnValue(mockTheme),
      set: vi.fn((newTheme) => {
        mockTheme = newTheme;
      }),
      add: vi.fn((newThemes: string | string[]) => {
        const themesToAdd: string[] = Array.isArray(newThemes) ? newThemes : [newThemes];
        themesToAdd.forEach((t) => {
          if (!mockThemes.includes(t)) {
            mockThemes.push(t);
          }
        });
      }),
      uninstall: vi.fn(),
      getAvailable: vi.fn().mockReturnValue(mockThemes)
    }))
  }
}));

describe('useTheme', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确返回初始主题', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('light');
  });

  it('应该能设置主题', async () => {
    const { result } = renderHook(() => useTheme());
    await act(async () => {
      result.current[1].setTheme('dark');
    });
    expect(result.current[1].getCurrentTheme()).toBe('dark');
  });

  it('应该能添加主题', async () => {
    const { result } = renderHook(() => useTheme());
    await act(async () => {
      result.current[1].addThemes('blue');
    });
    expect(result.current[1].getAvailableThemes()).toEqual(['light', 'dark', 'blue']);
  });

  it('应该能获取当前主题', async () => {
    const { result } = renderHook(() => useTheme());
    const current = await act(async () => result.current[1].getCurrentTheme());
    expect(current).toBe('auto');
  });

  it('应该能获取可用主题列表', () => {
    const { result } = renderHook(() => useTheme());
    const availableThemes = result.current[1].getAvailableThemes();
    expect(availableThemes).toEqual(['light', 'dark', 'blue']);
  });
});
