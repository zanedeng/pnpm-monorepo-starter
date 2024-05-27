import { useI18n } from '@zkj/vue3locale'
import type { ComponentType } from '../../types/componentType'

const { t } = useI18n()

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('AutoComplete')) {
    return t('common.inputText')
  }
  if (component.includes('Picker')) {
    return t('common.chooseText')
  }

  if (
    component.includes('Select') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch') ||
    component.includes('DatePicker') ||
    component.includes('TimePicker')
  ) {
    return t('common.chooseText')
  }
  return ''
}