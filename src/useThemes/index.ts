import { useState, useEffect, useCallback } from 'react';
import { theme } from 'lomind';
import { TThemeResult } from './interfaces';

/**
 * @zh 使用主题管理器
 * @en Use theme manager
 * @param {string} initialTheme 初始主题
 * @param {string[]} initialThemes 初始主题列表
 * @returns {TThemeResult} 主题管理器返回值
 */
const useTheme = (initialTheme: string = 'auto', initialThemes: string[] = ['light', 'dark', 'auto']): TThemeResult => {
  const themeManager = theme.getInstance(initialTheme, initialThemes);
  const [currentTheme, setCurrentTheme] = useState<string>(themeManager.getCurrent());

  const setTheme = useCallback(
    (theme: string) => {
      themeManager.set(theme);
      setCurrentTheme(theme);
    },
    [themeManager]
  );

  const addTheme = useCallback(
    (theme: string | string[]) => {
      themeManager.add(theme);
    },
    [themeManager]
  );

  useEffect(() => {
    themeManager.set(initialTheme);
    return () => themeManager.uninstall();
  }, [initialTheme, themeManager]);

  const getCurrentTheme = useCallback(() => themeManager.getCurrent(), [themeManager]);

  const getAvailableThemes = useCallback(() => themeManager.getAvailable(), [themeManager]);

  return [currentTheme, { setTheme, addTheme, getCurrentTheme, getAvailableThemes }];
};

export default useTheme;
