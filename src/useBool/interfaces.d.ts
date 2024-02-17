/**
 * @zh 提供布尔状态管理的Hook返回值类型。
 * @en The return type of a hook that provides boolean state management.
 */
export type TUseBoolReturn = [
  /**
   * @zh 当前布尔值
   * @en The current boolean value
   */
  boolean,
  {
    /**
     * @zh 设置布尔值
     * @en Set boolean value
     */
    set: (value: boolean) => void;
    /**
     * @zh 切换布尔值
     * @en Toggle boolean value
     */
    toggle: () => void;
    /**
     * @zh 设置为 `true`
     * @en Set to `true`
     */
    setTrue: () => void;
    /**
     * @zh 设置为 `false`
     * @en Set to `false`
     */
    setFalse: () => void;
  }
];
