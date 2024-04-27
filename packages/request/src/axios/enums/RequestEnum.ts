/**
 * @typedef {Object} RequestEnum
 * @description 定义HTTP请求方法枚举
 * @property {string} GET - 表示HTTP GET方法，用于获取资源
 * @property {string} POST - 表示HTTP POST方法，用于提交数据到服务器，通常用于创建新资源
 * @property {string} PUT - 表示HTTP PUT方法，用于替换服务器上的全部现有资源
 * @property {string} DELETE - 表示HTTP DELETE方法，用于删除指定的资源
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
