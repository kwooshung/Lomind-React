/**
 * @zh 提供主题状态管理的Hook返回值类型
 * @en The return value type of the hook that provides theme state management
 */
export type TThemeResult = [
  /**
   * @zh 当前主题
   * @en The current theme
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
     * @zh 获取当前主题
     * @en Get the current theme
     * @returns 当前主题
     */
    getCurrentTheme: () => string;
    /**
     * @zh 获取可用主题
     * @en Get available themes
     * @returns 可用主题
     */
    getAvailableThemes: () => string[];
  }
];
