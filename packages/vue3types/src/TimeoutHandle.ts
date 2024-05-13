/**
 * 定义 TimeoutHandle 类型
 * @typedef {ReturnType<typeof setTimeout>} TimeoutHandle
 * @description TimeoutHandle 类型表示 JavaScript 中 `setTimeout` 函数调用后的返回值类型。
 * `setTimeout` 函数会返回一个数值 ID，该 ID 可以用于取消定时器。因此，TimeoutHandle 类型实际上是表示这个数值 ID 的类型。
 *
 * 示例：
 * ```typescript
 * let timeoutId: TimeoutHandle;
 *
 * // 调用 setTimeout 函数并将返回值赋给 timeoutId
 * timeoutId = setTimeout(() => {
 *   console.log('Hello, world!');
 * }, 1000);
 *
 * // 清除定时器
 * clearTimeout(timeoutId);
 * ```
 * 在上述示例中，`timeoutId` 变量被赋予了 `setTimeout` 函数调用后的返回值，其类型为 TimeoutHandle。
 */
export type TimeoutHandle = ReturnType<typeof setTimeout>
