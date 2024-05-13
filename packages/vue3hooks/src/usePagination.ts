import { computed, ref, unref } from 'vue'
import type { Ref } from 'vue'

/**
 * 定义pagination函数
 * @function pagination
 * @description: 将数组list按指定的页码pageNo和每页大小pageSize进行分页处理
 * 输入一个列表和分页参数，返回对应页码下的数据子集
 */
function pagination<T = any>(list: T[], pageNo: number, pageSize: number): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= list.length
      ? list.slice(offset, list.length)
      : list.slice(offset, offset + Number(pageSize))
  return ret
}

/**
 * @exports usePagination
 * @description: 创建一个Vue的组合式API，用于对列表数据进行分页处理
 * 提供当前页码、每页大小的设置以及获取分页数据列表、总记录数等功能
 * @generic T 泛型类型，代表列表元素类型
 * @param {Ref<T[]>} list - 一个响应式的数组引用
 * @param {number} pageSize - 指定每页的数据数量
 * @returns {Object} 包含分页功能相关属性和方法的对象
 * @property {Ref<number>} currentPage - 当前页码引用，可读写
 * @property {Ref<number>} pageSizeRef - 每页大小引用，可读写
 * @property {ComputedRef<T[]>} getPaginationList - 分页后的数据列表，根据currentPage和pageSizeRef计算得出
 * @property {ComputedRef<number>} getTotal - 数据总记录数，基于list的长度计算得出
 * @method {Function} setCurrentPage - 设置当前页码
 * @method {Function} setPageSize - 设置每页大小
 *
 * @example
 * 示例：
 * ```javascript
 * const dataList = ref([{...}, {...}, ...]) // 假设是一个响应式的数据列表
 * const { currentPage, getPaginationList, setPageSize } = usePagination(dataList, 10)
 *
 * // 更新每页大小
 * setPageSize(20)
 * // 切换到第3页
 * setCurrentPage(3)
 * // 获取当前分页数据
 * const paginatedData = getPaginationList.value
 * ```
 */
export function usePagination<T = any>(list: Ref<T[]>, pageSize: number) {
  const currentPage = ref(1)
  const pageSizeRef = ref(pageSize)

  const getPaginationList = computed(() => {
    return pagination(unref(list), unref(currentPage), unref(pageSizeRef))
  })

  const getTotal = computed(() => {
    return unref(list).length
  })

  function setCurrentPage(page: number) {
    currentPage.value = page
  }

  function setPageSize(pageSize: number) {
    pageSizeRef.value = pageSize
  }

  return {
    setCurrentPage,
    getTotal,
    setPageSize,
    getPaginationList,
    currentPage,
  }
}
