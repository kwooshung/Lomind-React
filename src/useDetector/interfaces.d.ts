import UAParser from 'ua-parser-js';

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
 * @zh 操作系统信息
 * @en OS info
 */
interface IOSInfo {
  /**
   * @zh 操作系统名称
   * @en OS name
   */
  osName: string;
  /**
   * @zh 操作系统版本
   * @en OS version
   */
  osVersion: string;
}

/**
 * @zh 客户端信息探针
 * @en Client information detector
 */
interface IUseDetector {
  ua: string;
  parser: UAParser.UAParserInstance;
  browserInfo;
  osInfo;
  BrowserInfo: IBrowserInfo;
  OSInfo: IOSInfo;
  /**
   * @zh 判断是否为指定浏览器
   * @en Determine if it is a specified browser
   * @param name 浏览器名称
   * @param name Browser name
   * @returns 是否为指定浏览器
   */
  isBrowser(name: string): boolean;
  /**
   * @zh 判断是否为指定操作系统
   * @en Determine if it is a specified OS
   * @param version 目标版本
   * @param operator 比较操作符：'<', '>', '=', '<=', '>='
   * @return 是否满足条件
   */
  compareBrowserVersion(version: string, operator: '<' | '>' | '=' | '<=' | '>='): boolean;
  /**
   * 判断是否为移动设备
   */
  isMobile(): boolean;
  /**
   * 判断是否为平板设备
   */
  isTablet(): boolean;
}

/**
 * @zh 提供布尔状态管理的Hook返回值类型。
 * @en The return type of a hook that provides boolean state management.
 */
export type TUseDetectorResult = IUseDetector;
