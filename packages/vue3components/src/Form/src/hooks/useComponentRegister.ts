import { tryOnUnmounted } from '@zkj/vue3hooks'
import { isPascalCase } from '@zkj/utils'
import { add, del } from '../componentMap'
import type { ComponentType } from '../types'
import type { Component } from 'vue'

export function useComponentRegister<T extends string, R extends Component>(
  compName: ComponentType | T,
  comp: R
) {
  if (!isPascalCase(compName)) {
    throw new Error('compName must be in PascalCase')
  }

  add(compName, comp)
  tryOnUnmounted(() => {
    del(compName)
  })
}
