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

  const setTheme = useCallback(
    (theme: string) => {
      themesManager.set(theme);
      setValue(themesManager.getValue());
      setName(themesManager.getName());
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

  const getValueTheme = useCallback(() => themesManager.getValue(), [themesManager]);

  const getNameTheme = useCallback(() => themesManager.getName(), [themesManager]);

  const getAvailableThemes = useCallback(() => themesManager.getAvailable(), [themesManager]);

  return [vaule, name, { setTheme, addThemes, getValueTheme, getNameTheme, getAvailableThemes }];
};

export default useThemes;
