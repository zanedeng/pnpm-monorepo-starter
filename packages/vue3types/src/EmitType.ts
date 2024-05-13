/**
 * 定义 EmitType 泛型类型
 * @typedef {function} EmitType
 * @description EmitType 类型用于定义一个事件触发器函数，该函数负责触发一个特定的事件并向监听者传递一组参数。
 *
 * @param {string} event - 事件名称，通常是一个字符串，标识了需要触发的事件类型。
 * @param {...any[]} args - 可变参数列表，用于传递给事件处理器的附加参数，可以是任意类型和数量。
 * @returns {void} - 该函数没有返回值。
 *
 * 示例：
 * ```typescript
 * interface MyComponent {
 *   emit: EmitType;
 * }
 *
 * const component: MyComponent = {
 *   emit(event: string, ...args: any[]) {
 *     // 触发事件并传递参数的逻辑
 *     console.log(`Event "${event}" emitted with arguments:`, args);
 *   }
 * };
 *
 * component.emit('change', 'newValue'); // 触发 "change" 事件，并传递一个参数 "newValue"
 * ```
 */
export type EmitType = (event: string, ...args: any[]) => void
