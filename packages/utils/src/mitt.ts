/**
 * 定义事件类型，可以是字符串或符号。
 * @typedef {string | symbol} EventType
 */
export type EventType = string | symbol

/**
 * 定义事件处理器函数，可选地接受一个事件参数，无返回值。
 * @template T - 事件载荷的数据类型
 * @callback Handler
 * @param {T} event - 需要处理的事件载荷
 */
export type Handler<T = unknown> = (event: T) => void

/**
 * 通配符处理器，可以处理所有类型的事件，接收到事件类型和相应的事件数据。
 * @template T - 事件类型及其载荷的记录类型
 * @callback WildcardHandler
 * @param {keyof T} type - 发生事件的类型
 * @param {T[keyof T]} event - 给定类型的实际事件载荷
 */
export type WildcardHandler<T = Record<string, unknown>> = (
  type: keyof T,
  event: T[keyof T]
) => void

/**
 * 定义特定事件类型的已注册处理器列表。
 * @template T - 事件载荷的数据类型
 * @typedef {Array<Handler<T>>} EventHandlerList
 */
export type EventHandlerList<T = unknown> = Array<Handler<T>>

/**
 * 定义能够处理多个事件类型的通配符处理器列表。
 * @template T - 事件类型及其载荷的记录类型
 * @typedef {Array<WildcardHandler<T>>} WildCardEventHandlerList
 */
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<
  WildcardHandler<T>
>

/**
 * 定义事件类型及其对应处理器数组的映射关系。
 * 支持特定事件处理器和通配符处理器。
 * @template Events - 事件类型及其载荷类型的记录类型
 * @typedef {Map<keyof Events | '*', EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>>} EventHandlerMap
 */
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>

/**
 * 描述了一个能够注册、注销、触发事件和清除所有事件监听器的事件发射器接口。
 * @template Events - 事件类型及其载荷类型的记录类型
 * @interface Emitter
 * @property {EventHandlerMap<Events>} all - 存储事件名称与其注册处理器函数映射关系的映射表
 * @method on - 注册给定类型的事件处理器
 * @method off - 移除给定类型的事件处理器
 * @method emit - 触发给定类型的全部处理器
 * @method clear - 清除所有已注册的事件处理器
 */
export interface Emitter<Events extends Record<EventType, unknown>> {
  all: EventHandlerMap<Events>

  /**
   * 注册一个指定事件类型的处理器。
   * @param {keyof Events} type - 需要监听的事件类型，或使用 `"*"` 代表所有事件
   * @param {Handler<Events[Key]> | WildcardHandler<Events>} handler - 当事件触发时调用的函数
   */
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void

  /**
   * 注册一个通配符处理器，响应所有的事件。
   * @param {"*"} type - 特殊的通配符事件类型
   * @param {WildcardHandler<Events>} handler - 在每个发出事件时调用的函数
   */
  on(type: '*', handler: WildcardHandler<Events>): void

  /**
   * 移除一个指定事件类型的处理器。
   * 如果没有提供 `handler`，则移除该类型的所有处理器。
   * @param {keyof Events} type - 需要注销处理器的事件类型，或使用 `"*"` 移除通配符处理器
   * @param {Handler<Events[Key]> | WildcardHandler<Events>} [handler] - 需要移除的具体处理器，如果不提供则移除该类型的所有处理器
   */
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void

  /**
   * 移除一个通配符处理器。
   * @param {"*"} type - 通配符事件类型
   * @param {WildcardHandler<Events>} handler - 需要移除的通配符处理器
   */
  off(type: '*', handler: WildcardHandler<Events>): void

  /**
   * 触发指定类型的所有处理器。
   * 如果存在，会在类型匹配的处理器之后触发通配符处理器（"*"）。
   * 注意：不支持手动触发通配符处理器。
   * @param {keyof Events} type - 需要触发的事件类型
   * @param {Events[Key]} [evt] - 传递给每个处理器的事件载荷（推荐使用对象形式）
   */
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
  emit<Key extends keyof Events>(
    type: undefined extends Events[Key] ? Key : never
  ): void

  /**
   * 清除所有事件处理器。
   */
  clear(): void
}

/**
 * 创建一个mitt事件发射器实例，它允许对事件进行订阅、取消订阅、触发和清理操作。
 * @template Events - 自定义事件类型及其关联数据类型的键值对集合
 * @param {EventHandlerMap<Events>} [all] - 可选的初始事件处理器映射表
 * @returns {Emitter<Events>} - 具有事件管理功能的mitt实例
 */
export function mitt<Events extends Record<EventType, unknown>>(
  all?: EventHandlerMap<Events>
): Emitter<Events> {
  // 定义通用事件处理器类型，可以是针对具体事件类型的处理器，也可以是通配符处理器
  type GenericEventHandler =
    | Handler<Events[keyof Events]>
    | WildcardHandler<Events>

  // 初始化事件处理器映射表，如果没有传入，则新建一个Map
  all = all || new Map()

  // 返回一个具有事件管理功能的对象
  return {
    /**
     * 存储所有事件类型及其对应的处理器列表的映射表
     */
    all,
    /**
     * 注册一个事件处理器，使其在指定事件类型触发时执行。
     * @param {keyof Events} type - 事件类型
     * @param {GenericEventHandler} handler - 事件处理器函数
     */
    on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
      const handlers: Array<GenericEventHandler> | undefined = all!.get(type)
      if (handlers) {
        handlers.push(handler)
      } else {
        all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>)
      }
    },
    /**
     * 移除已注册的事件处理器。
     * 如果指定了处理器，则移除该特定处理器；否则移除指定事件类型的所有处理器。
     * @param {keyof Events} type - 事件类型
     * @param {GenericEventHandler} [handler] - 需要移除的事件处理器函数（可选）
     */
    off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
      const handlers: Array<GenericEventHandler> | undefined = all!.get(type)
      if (handlers) {
        if (handler) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1)
        } else {
          all!.set(type, [])
        }
      }
    },
    /**
     * 触发指定类型的事件，并将其数据传递给已注册的处理器。
     * 先触发指定类型的处理器，再触发通配符处理器（如果存在）。
     * @param {keyof Events} type - 事件类型
     * @param {Events[Key]} [evt] - 事件数据（可选）
     */
    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
      let handlers = all!.get(type)
      if (handlers) {
        ;(handlers as EventHandlerList<Events[keyof Events]>)
          .slice()
          .forEach((handler) => {
            handler(evt as Events[Key])
          })
      }

      handlers = all!.get('*')
      if (handlers) {
        ;(handlers as WildCardEventHandlerList<Events>)
          .slice()
          .forEach((handler) => {
            handler(type, evt as Events[Key])
          })
      }
    },
    /**
     * 清除所有已注册的事件处理器。
     */
    clear() {
      this.all.clear()
    },
  }
}
