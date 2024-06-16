/**
 * @zh 浏览器信息
 * @en Browser info
 */
interface IBrowserInfo {
  /**
   * @zh 浏览器名称
   * @en Browser name
   */
  name: string;
  /**
   * @zh 浏览器版本
   * @en Browser version
   */
  fullVersion: string;
  /**
   * @zh 浏览器主版本号
   * @en Browser major version
   */
  majorVersion: string;
}

/**
 * @zh 浏览器返回值
 * @en Browser result
 * @returns {IBrowserInfo} 当前主题值
 */
export type TBrowserResult = {
  /**
   * @zh 浏览器信息
   * @en Browser info
   */
  info: IBrowserInfo;
  /**
   * @zh 判断是否为指定浏览器
   * @en Determine if it is a specified browser
   * @param {string} name 浏览器名称
   * @returns 是否为指定浏览器
   */
  isName: (name: string) => boolean;

  /**
   * @zh 判断是否为指定操作系统
   * @en Determine if it is a specified OS
   * @param {string} version 目标版本
   * @param {'<' | '>' | '=' | '<=' | '>='} operator 比较操作符
   * @return 是否满足条件
   */
  compare: (version: string, operator: '<' | '>' | '=' | '<=' | '>=') => boolean;
};
