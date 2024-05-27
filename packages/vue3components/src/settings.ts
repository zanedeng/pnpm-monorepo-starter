import { deepMerge } from '@zkj/utils'
import type { Recordable } from '@zkj/vue3types'
import type { SorterResult } from './Table'

let settings = {
  table: {
    fetchSetting: {
      pageField: 'page',
      sizeField: 'pageSize',
      listField: 'items',
      totalField: 'total',
    },
    pageSizeOptions: ['10', '50', '80', '100'],
    defaultPageSize: 10,
    defaultSize: 'middle',
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo
      if (field && order) {
        return {
          field,
          order,
        }
      } else {
        return {}
      }
    },
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data
    },
  },
  scrollbar: {
    native: false,
  },
}

export const setComponentSetting = (options: any) => {
  settings = deepMerge(settings, options)
}

export const getComponentSetting = () => settings
