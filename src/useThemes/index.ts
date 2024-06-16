import { useState, useCallback } from 'react';
import { themes } from 'lomind';
import useUnmount from '../useUnmount';
import { TThemeResult } from './interfaces';
import { useMount } from '..';

/**
 * @zh 使用主题管理器
 * @en Use theme manager
 * @param {string} initialTheme 初始主题
 * @param {string[]} initialThemes 初始主题列表
 * @returns {TThemeResult} 主题管理器返回值
 */
const useThemes = (initialTheme: string = 'auto', initialThemes: string[] = ['light', 'dark']): TThemeResult => {
  const themesManager = themes.getInstance(initialTheme, initialThemes);

  const [vaule, setValue] = useState<string>(themesManager.getValue());
  const [name, setName] = useState<string>(themesManager.getName());

  useMount(() => {
    themesManager.bindChange((value: string, name: string) => {
      setValue(value);
      setName(name);
    });
  });

  /**
   * @zh 设置主题
   * @en Set theme
   * @param {string} theme 主题名称
   */
  const setTheme = useCallback(
    (theme: string) => {
      themesManager.set(theme);
      setValue(themesManager.getValue());
      setName(themesManager.getName());
    },
    [themesManager]
  );

  /**
   * @zh 添加主题
   * @en Add theme
   * @param {string | string[]} theme 主题名称
   */
  const addThemes = useCallback(
    (theme: string | string[]) => {
      themesManager.add(theme);
    },
    [themesManager]
  );

  useUnmount(() => {
    themesManager.uninstall();
  });

  /**
   * @zh 获取主题值
   * @en Get theme value
   * @returns {string} 主题值
   */
  const getThemeValue = useCallback(() => themesManager.getValue(), [themesManager]);

  /**
   * @zh 获取主题名称, value=auto 为跟随系统主题，因此需要根据系统主题值返回 light 或 dark
   * @en Get theme name, value=auto is the system theme, so you need to return light or dark based on the system theme value
   * @returns {string} 主题名称
   */
  const getThemeName = useCallback(() => themesManager.getName(), [themesManager]);

  /**
   * @zh 获取可用主题
   * @en Get available themes
   * @returns {string[]} 可用主题
   */
  const getThemesAvailable = useCallback(() => themesManager.getAvailable(), [themesManager]);

  /**
   * @zh 返回主题值、主题名称、主题管理器
   * @en Return theme value, theme name, theme manager
   */
  return [vaule, name, { setTheme, addThemes, getThemeValue, getThemeName, getThemesAvailable }];
};

export default useThemes;
