/**
 * @typedef {Object} ContentTypeEnum
 * @description 定义HTTP请求内容类型枚举
 * @property {string} JSON - 表示JSON格式的数据，通常用于发送JSON对象作为请求主体，编码为UTF-8
 * @property {string} FORM_URLENCODED - 表示URL编码的表单数据，适用于发送键值对形式的数据，编码为UTF-8
 * @property {string} FORM_DATA - 表示多部分/表单数据，适用于上传文件或发送包含二进制数据的表单，编码为UTF-8
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
