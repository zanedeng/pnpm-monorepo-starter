<template>
  <Col v-if="showActionButtonGroup" v-bind="actionColOpt">
    <div :style="{ textAlign: actionColOpt.style.textAlign, width: '100%' }">
      <Form.Item>
        <slot name="resetBefore" />
        <Button
          v-if="showResetButton"
          type="default"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
        >
          {{ getResetBtnOptions.text }}
        </Button>
        <slot name="submitBefore" />

        <Button
          v-if="showSubmitButton"
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
        >
          {{ getSubmitBtnOptions.text }}
        </Button>

        <slot name="advanceBefore" />
        <Button
          v-if="showAdvancedButton && !hideAdvanceBtn"
          type="link"
          size="small"
          @click="toggleAdvanced"
        >
          {{
            isAdvanced
              ? t('component.form.putAway')
              : t('component.form.unfold')
          }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </Button>
        <slot name="advanceAfter" />
      </Form.Item>
    </div>
  </Col>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Col, Form } from 'ant-design-vue'
import { useI18n } from '@zkj/vue3locale'
import { useFormContext } from '../hooks/useFormContext'
import { Button, type ButtonProps } from '../../../Button'
import { BasicArrow } from '../../../Basic'
import type { PropType } from 'vue'
import type { ColEx } from '../types'

defineOptions({ name: 'BasicFormAction' })

const props = defineProps({
  showActionButtonGroup: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  showResetButton: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  showSubmitButton: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  showAdvancedButton: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  resetButtonOptions: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
  },
  submitButtonOptions: {
    type: Object as PropType<ButtonProps>,
    default: () => ({}),
  },
  actionColOptions: {
    type: Object as PropType<Partial<ColEx>>,
    default: () => ({}),
  },
  actionSpan: {
    type: Number as PropType<number>,
    default: 6,
  },
  isAdvanced: {
    type: Boolean as PropType<boolean>,
  },
  hideAdvanceBtn: {
    type: Boolean as PropType<boolean>,
  },
})

const emit = defineEmits(['toggle-advanced'])

const { t } = useI18n()
const { resetAction, submitAction } = useFormContext()

const actionColOpt = computed(() => {
  const { showAdvancedButton, actionSpan: span, actionColOptions } = props
  const actionSpan = 24 - span
  const advancedSpanObj = showAdvancedButton
    ? { span: actionSpan < 6 ? 24 : actionSpan }
    : {}
  const actionColOpt: Partial<ColEx> = {
    style: { textAlign: 'right' },
    span: showAdvancedButton ? 6 : 4,
    ...advancedSpanObj,
    ...actionColOptions,
  }
  return actionColOpt
})

const getResetBtnOptions = computed((): ButtonProps => {
  return Object.assign(
    {
      text: t('common.resetText'),
    },
    props.resetButtonOptions
  )
})

const getSubmitBtnOptions = computed((): ButtonProps => {
  return Object.assign(
    {
      text: t('common.queryText'),
    },
    props.submitButtonOptions
  )
})

function toggleAdvanced() {
  emit('toggle-advanced')
}
</script>
