/**
 * 遍历树形数据结构（递归遍历子节点）
 * @function eachTree
 * @param {any[]} treeDatas - 树形数据数组，每一项应包含 children 属性表示子节点
 * @param {Function} callBack - 回调函数，会在遍历每个节点时被调用，接受两个参数：
 * 1. 当前节点元素
 * 2. 父节点元素，默认为空对象 {}
 * @param {Object} [parentNode={}] - 可选参数，父节点，默认为空对象
 *
 * @description
 * 此函数会深度优先遍历传入的树形数据结构，并对每一个节点调用回调函数。
 * 若回调函数返回新的节点对象，那么后续对该节点及其子节点的遍历将以新节点为准。
 */
export function eachTree(
  treeDatas: any[],
  callBack: Function,
  parentNode = {}
) {
  // 遍历树形数据
  treeDatas.forEach((element) => {
    // 调用回调函数处理当前节点，并获取返回值
    const newNode = callBack(element, parentNode) || element
    // 如果当前节点有子节点，则递归遍历子节点
    if (element.children) {
      eachTree(element.children, callBack, newNode)
    }
  })
}
