import { context } from '../axios/context'

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: 'message' | 'none' | 'modal' | undefined = 'message'
): void {
  if (status === 401 && context.unauthorizedFunction) {
    context.unauthorizedFunction?.(msg)
  } else {
    context.handleErrorFunction?.(status, errorMessageMode)
  }
}
