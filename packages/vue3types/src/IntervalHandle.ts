/**
 * 定义 IntervalHandle 类型
 * @typedef {ReturnType<typeof setInterval>} IntervalHandle
 * @description IntervalHandle 类型表示 JavaScript 中 `setInterval` 函数调用后的返回值类型。
 * `setInterval` 函数用于设置一个重复执行的定时任务，它会返回一个数值 ID，该 ID 可用于取消定时器。
 * 因此，IntervalHandle 类型实际上是表示这个用于取消定时器的数值 ID 的类型。
 *
 * 示例：
 * ```typescript
 * let intervalId: IntervalHandle;
 *
 * // 调用 setInterval 函数并将返回值赋给 intervalId
 * intervalId = setInterval(() => {
 *   console.log('每隔一秒执行一次');
 * }, 1000);
 *
 * // 清除定时器
 * clearInterval(intervalId);
 * ```
 * 在上述示例中，`intervalId` 变量被赋予了 `setInterval` 函数调用后的返回值，其类型为 IntervalHandle。
 */
export type IntervalHandle = ReturnType<typeof setInterval>
