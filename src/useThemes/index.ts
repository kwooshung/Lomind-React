import { useState, useEffect, useCallback } from 'react';
import { themes } from 'lomind';
import { TThemeResult } from './interfaces';

/**
 * @zh 使用主题管理器
 * @en Use theme manager
 * @param {string} initialTheme 初始主题
 * @param {string[]} initialThemes 初始主题列表
 * @returns {TThemeResult} 主题管理器返回值
 */
const useThemes = (initialTheme: string = 'auto', initialThemes: string[] = ['light', 'dark', 'auto']): TThemeResult => {
  const themesManager = themes.getInstance(initialTheme, initialThemes);
  const [currentTheme, setCurrentTheme] = useState<string>(themesManager.getCurrent());

  const setTheme = useCallback(
    (theme: string) => {
      themesManager.set(theme);
      setCurrentTheme(theme);
    },
    [themesManager]
  );

  const addThemes = useCallback(
    (theme: string | string[]) => {
      themesManager.add(theme);
    },
    [themesManager]
  );

  useEffect(() => {
    themesManager.set(initialTheme);
    return () => themesManager.uninstall();
  }, [initialTheme, themesManager]);

  const getCurrentTheme = useCallback(() => themesManager.getCurrent(), [themesManager]);

  const getAvailableThemes = useCallback(() => themesManager.getAvailable(), [themesManager]);

  return [currentTheme, { setTheme, addThemes, getCurrentTheme, getAvailableThemes }];
};

export default useThemes;
