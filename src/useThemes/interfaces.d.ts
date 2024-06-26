/**
 * @zh 提供主题状态管理的Hook返回值类型
 * @en The return value type of the hook that provides theme state management
 */
export type TThemeResult = [
  /**
   * @zh 当前主题值
   * @en The current theme value
   */
  string,
  /**
   * @zh 当前主题名称
   * @en The current theme name
   */
  string,
  {
    /**
     * @zh 设置主题
     * @en Set theme
     * @param {string} theme 主题
     * @returns 无返回值
     */
    setTheme: (theme: string) => void;
    /**
     * @zh 添加主题
     * @en Add themes
     * @param {string | string[]} themes 主题
     */
    addThemes: (themes: string | string[]) => void;
    /**
     * @zh 获取当前主题值
     * @en Get the current theme value
     * @returns 当前主题值
     */
    getThemeValue: () => string;
    /**
     * @zh 获取当前主题名
     * @en Get the current theme name
     * @returns 当前主题名
     */
    getThemeName: () => string;
    /**
     * @zh 获取可用主题
     * @en Get available themes
     * @returns 可用主题
     */
    getThemesAvailable: () => string[];
  }
];
