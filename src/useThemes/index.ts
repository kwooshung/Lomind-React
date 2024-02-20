import { useState, useCallback } from 'react';
import { themes } from 'lomind';
import useUnmount from '../useUnmount';
import { TThemeResult } from './interfaces';

/**
 * @zh 使用主题管理器
 * @en Use theme manager
 * @param {string} initialTheme 初始主题
 * @param {string[]} initialThemes 初始主题列表
 * @returns {TThemeResult} 主题管理器返回值
 */
const useThemes = (initialTheme: string = 'auto', initialThemes: string[] = ['light', 'dark']): TThemeResult => {
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

  useUnmount(() => {
    themesManager.uninstall();
  });

  const getCurrentTheme = useCallback(() => themesManager.getCurrent(), [themesManager]);

  const getAvailableThemes = useCallback(() => themesManager.getAvailable(), [themesManager]);

  return [currentTheme, { setTheme, addThemes, getCurrentTheme, getAvailableThemes }];
};

export default useThemes;
