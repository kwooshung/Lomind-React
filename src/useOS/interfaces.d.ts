/**
 * @zh 操作系统信息
 * @en OS info
 */
interface IOSInfo {
  /**
   * @zh 操作系统名称
   * @en OS name
   */
  name: string;
  /**
   * @zh 操作系统版本
   * @en OS version
   */
  version: string;
  /**
   * @zh CPU 信息
   * @en CPU info
   */
  platform: string;
}

/**
 * @zh OS返回值
 * @en OS result
 * @returns {IOSInfo} 当前主题值
 */
export type TOSResult = {
  /**
   * @zh 浏览器信息
   * @en Browser info
   */
  info: IOSInfo;

  /**
   * @zh 判断是否为指定操作系统
   * @en Determine if it is a specified OS
   * @param {string} name 操作系统名称
   * @returns 是否为指定操作系统
   */
  isName: (name: string) => boolean;

  /**
   * @zh 判断是否为指定操作系统版本
   * @en Determine if it is a specified OS version
   * @param {string} version 目标版本
   * @param {'<' | '>' | '=' | '<=' | '>='} operator 比较操作符
   * @return 是否满足条件
   */
  compare: (version: string, operator: '<' | '>' | '=' | '<=' | '>=') => boolean;
};
