/**
 * @zh 提供主题状态管理的Hook返回值类型
 * @en The return value type of the hook that provides theme state management
 */
export type TThemeResult = {
  /**
   * 当前主题值 Current theme value
   */
  themeValue: string;
  /**
   * 当前主题名称 Current theme name
   */
  themeName: string;
  /**
   * 设置主题 Set theme
   * @param {string} theme 主题名称 Theme name
   */
  setTheme: (theme: string) => void;
  /**
   * 添加主题 Add theme
   * @param {string | string[]} theme 主题名称 Theme name
   */
  addTheme: (theme: string | string[]) => void;
  /**
   * 获取可用主题 Get available themes
   * @returns {string[]}
   */
  getAvailableThemes: () => string[];
  /**
   * 添加主题变化监听器 Add theme change listener
   * @param {(value: string, name: string) => void} callback 主题变化时触发的回调 The callback triggered when the theme changes
   */
  addThemeChangeListener: (callback: (value: string, name: string) => void) => void;
  /**
   * 移除主题变化监听器 Remove theme change listener
   * @param {(value: string, name: string) => void} callback 要移除的回调函数 The callback function to be removed
   */
  removeThemeChangeListener: (callback: (value: string, name: string) => void) => void;
};
