/**
 * @class Memory
 * @implements {Storage}
 * @description 本类实现 Storage 接口，提供基于内存的模拟存储功能，可模拟浏览器的 localStorage 或 sessionStorage。
 */
export class Memory implements Storage {
  /**
   * @private
   * @property {_data}
   * @type {{ [key: string]: any }}
   * @description 内部字典对象，用于存储键值对数据。
   */
  private _data: { [key: string]: any } = {}

  /**
   * @public
   * @property {length}
   * @type {number}
   * @description 存储的数据项数量。
   */
  length = 0

  /**
   * @method clear
   * @description 清除所有存储的数据，同时将 length 属性置零。
   */
  clear(): void {
    this._data = {}
    this.length = 0
  }

  /**
   * @method getItem
   * @param {string} key - 要获取其值的键名。
   * @returns {string | null} - 返回与指定键关联的值，以 JSON 字符串形式表示，若无此键则返回 null。
   */
  getItem(key: string): string | null {
    return Object.prototype.hasOwnProperty.call(this._data, key)
      ? JSON.stringify(this._data[key])
      : null
  }

  /**
   * @method key
   * @param {number} index - 数据项的索引位置。
   * @returns {string | null} - 返回对应索引位置的键名，若索引超出范围则返回 null。
   */
  key(index: number): string | null {
    const keys = Object.keys(this._data)
    return index >= 0 && index < keys.length ? keys[index] : null
  }

  /**
   * @method removeItem
   * @param {string} key - 要移除的键名。
   * @description 删除指定键名的数据项，并减少 length 计数器。
   */
  removeItem(key: string): void {
    if (Object.prototype.hasOwnProperty.call(this._data, key)) {
      delete this._data[key]
      this.length--
    }
  }

  /**
   * @method setItem
   * @param {string} key - 要设置的键名。
   * @param {string} data - 需要存储的值，以 JSON 字符串形式传递。
   * @description 将给定的 JSON 字符串解析为 JavaScript 对象并存储，
   * 若解析失败则抛出错误。
   */
  setItem(key: string, data: string): void {
    try {
      const parsedData = JSON.parse(data)
      this._data[key] = parsedData
      this.length++
    } catch (err) {
      throw new Error('Failed to parse data to set in storage')
    }
  }

  /**
   * @method syncToStorage
   * @param {'local' | 'session'} type - 指定要同步到的目标浏览器存储类型，'local' 表示 localStorage，'session' 表示 sessionStorage。
   * @description 将内存中的所有数据同步到指定类型的浏览器存储中。
   */
  syncToStorage(type: 'local' | 'session'): void {
    const storage = type === 'local' ? localStorage : sessionStorage
    Object.entries(this._data).forEach(([key, value]) => {
      storage.setItem(key, JSON.stringify(value))
    })
  }
}
