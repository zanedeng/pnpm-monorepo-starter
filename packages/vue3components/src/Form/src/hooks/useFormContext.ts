import { createContext, useContext } from '@zkj/vue3hooks'
import type { InjectionKey } from 'vue'

export interface FormContextProps {
  resetAction: () => Promise<void>
  submitAction: () => Promise<void>
}

const key: InjectionKey<FormContextProps> = Symbol()

export function createFormContext(context: FormContextProps) {
  return createContext<FormContextProps>(context, key)
}

export function useFormContext() {
  return useContext<FormContextProps>(key)
}
