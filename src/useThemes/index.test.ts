import { renderHook, act } from '@testing-library/react-hooks';
import { isSSR } from 'lomind';
import useThemes from '.';

let mockTheme = 'light';
let mockThemes = ['light', 'dark'];
let mockBindChangeCallback;
const mockBindChange = (callback) => {
  mockBindChangeCallback = callback;
};

// 模拟 lomind 模块
vi.mock('lomind', () => ({
  isSSR: vi.fn(() => false),
  themes: {
    getInstance: vi.fn().mockImplementation(() => ({
      getValue: vi.fn().mockReturnValue(mockTheme),
      getName: vi.fn().mockReturnValue(mockTheme),
      set: vi.fn((newTheme) => {
        mockTheme = newTheme;
        if (mockBindChangeCallback) {
          mockBindChangeCallback(newTheme, newTheme);
        }
      }),
      add: vi.fn((newThemes: string | string[]) => {
        const themesToAdd: string[] = Array.isArray(newThemes) ? newThemes : [newThemes];
        themesToAdd.forEach((t) => {
          if (!mockThemes.includes(t)) {
            mockThemes.push(t);
          }
        });
      }),
      getAvailable: vi.fn(() => mockThemes),
      bindChange: mockBindChange,
      uninstall: vi.fn()
    }))
  }
}));

describe('useThemes', () => {
  beforeEach(() => {
    // 重置模拟数据
    vi.resetModules();
    mockTheme = 'light'; // 重置 mockTheme 到初始状态
    mockThemes = ['light', 'dark']; // 重置 mockThemes 到初始状态
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确返回初始主题', () => {
    const { result } = renderHook(() => useThemes());

    expect(result.current.themeValue).toBe('light');
    expect(result.current.themeName).toBe('light');
  });

  it('应该能设置主题', async () => {
    const { result } = renderHook(() => useThemes());
    await act(async () => {
      result.current.setTheme('dark');
      mockBindChangeCallback('dark', 'dark'); // Manually trigger the change
    });

    expect(result.current.themeValue).toBe('dark');
    expect(result.current.themeName).toBe('dark');
  });

  it('应该能添加新主题', async () => {
    const { result } = renderHook(() => useThemes());
    await act(async () => {
      result.current.addTheme('blue');
    });

    expect(result.current.getAvailableThemes()).toEqual(['light', 'dark', 'blue']);
  });

  it('应该能获取当前主题', async () => {
    const { result } = renderHook(() => useThemes());
    const current = result.current.themeName;
    expect(current).toBe('light');
  });

  it('应该能获取可用主题列表', () => {
    const { result } = renderHook(() => useThemes());
    act(() => {
      result.current.addTheme('blue');
    });
    const availableThemes = result.current.getAvailableThemes();
    expect(availableThemes).toEqual(['light', 'dark', 'blue']);
  });

  it('bindChange 应该在主题更改时更新状态', () => {
    const { result } = renderHook(() => useThemes());

    // 模拟主题更改
    act(() => {
      mockBindChangeCallback('dark', 'Dark Theme');
    });

    // 检查状态是否更新
    expect(result.current.themeValue).toBe('dark');
    expect(result.current.themeName).toBe('Dark Theme');
  });

  it('应该正确添加和移除主题变化监听器', () => {
    const { result } = renderHook(() => useThemes());

    const mockCallback = vi.fn();

    // 添加监听器
    act(() => {
      result.current.addThemeChangeListener(mockCallback);
    });

    // 模拟主题更改
    act(() => {
      mockBindChangeCallback('dark', 'Dark Theme');
    });

    expect(mockCallback).toHaveBeenCalledWith('dark', 'Dark Theme');

    // 移除监听器
    act(() => {
      result.current.removeThemeChangeListener(mockCallback);
    });

    // 模拟再次更改主题
    act(() => {
      mockBindChangeCallback('light', 'Light Theme');
    });

    expect(mockCallback).not.toHaveBeenCalledWith('light', 'Light Theme');
  });

  it('在 SSR 为 true 时应返回 initialTheme', () => {
    const mockIsSSR = vi.mocked(isSSR).mockReturnValue(true);
    const { result } = renderHook(() => useThemes('auto', ['light', 'dark']));

    expect(result.current.themeValue).toBe('auto');
    expect(result.current.themeName).toBe('auto');

    mockIsSSR.mockRestore();
  });

  it('在 SSR 为 true 时应返回空的可用主题数组', () => {
    const mockIsSSR = vi.mocked(isSSR).mockReturnValue(true);
    const { result } = renderHook(() => useThemes('auto', ['light', 'dark']));

    expect(result.current.getAvailableThemes()).toEqual([]);

    mockIsSSR.mockRestore();
  });
});
