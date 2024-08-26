import { useEffect, useState, useCallback, useRef } from 'react';
import { themes as Themes, isSSR } from 'lomind';
import { TThemeResult } from './interfaces';

/**
 * @zh 主题 自定义 hook
 * @en Theme custom hook
 * @param {string} [initialTheme='auto'] 初始主题
 * @param {string[]} [initialThemes=['light', 'dark']] 可用主题
 * @returns {object} 主题对象
 */
const useThemes = (initialTheme: string = 'auto', initialThemes: string[] = ['light', 'dark']): TThemeResult => {
  const [themeValue, setThemeValue] = useState<string>(() => {
    if (!isSSR()) {
      return Themes.getInstance(initialTheme, initialThemes).getValue();
    }
    return initialTheme;
  });

  const [themeName, setThemeName] = useState<string>(() => {
    if (!isSSR()) {
      return Themes.getInstance(initialTheme, initialThemes).getName();
    }
    return initialTheme;
  });

  const changeListeners = useRef<Array<(value: string, name: string) => void>>([]);

  const handleThemeChange = useCallback((value: string, name: string) => {
    setThemeValue(value);
    setThemeName(name);
    // 调用所有已注册的回调
    changeListeners.current.forEach((callback) => callback(value, name));
  }, []);

  useEffect(() => {
    if (isSSR()) {
      return;
    }

    const themeManager = Themes.getInstance(initialTheme, initialThemes);
    themeManager.bindChange(handleThemeChange);

    return () => {
      themeManager.uninstall();
    };
  }, [initialTheme, initialThemes, handleThemeChange]);

  /**
   * @zh 设置主题
   * @en Set theme
   * @param {string} theme 主题名称
   */
  const setTheme = useCallback((theme: string) => {
    if (!isSSR()) {
      const themeManager = Themes.getInstance();
      themeManager.set(theme);
      setThemeValue(themeManager.getValue());
      setThemeName(themeManager.getName());
    }
  }, []);

  /**
   * @zh 添加主题
   * @en Add theme
   * @param {string | string[]} theme 主题名称
   */
  const addTheme = useCallback((theme: string | string[]) => {
    if (!isSSR()) {
      const themeManager = Themes.getInstance();
      themeManager.add(theme);
    }
  }, []);

  /**
   * @zh 获取可用主题
   * @en Get available themes
   * @returns {string[]}
   */
  const getAvailableThemes = useCallback(() => {
    if (!isSSR()) {
      return Themes.getInstance().getAvailable();
    }
    return [];
  }, []);

  /**
   * @zh 添加主题变化监听器
   * @en Add a theme change listener
   * @param {Function} callback 主题变化时触发的回调
   */
  const addThemeChangeListener = useCallback((callback: (value: string, name: string) => void) => {
    changeListeners.current.push(callback);
  }, []);

  /**
   * @zh 移除主题变化监听器
   * @en Remove a theme change listener
   * @param {Function} callback 要移除的回调函数
   */
  const removeThemeChangeListener = useCallback((callback: (value: string, name: string) => void) => {
    changeListeners.current = changeListeners.current.filter((cb) => cb !== callback);
  }, []);

  return {
    themeValue,
    themeName,
    setTheme,
    addTheme,
    getAvailableThemes,
    addThemeChangeListener,
    removeThemeChangeListener
  };
};

export default useThemes;
