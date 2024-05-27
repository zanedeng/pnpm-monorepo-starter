<script lang="ts">
import { computed, defineComponent, h, unref } from 'vue'
import { Popconfirm } from 'ant-design-vue'
import { useAttrs } from '@zkj/vue3hooks'
import { omit } from '@zkj/utils'
import { useI18n } from '@zkj/vue3locale'
import BasicButton from './BasicButton.vue'
import { extendSlots } from '../../'

const props = {
  enable: {
    type: Boolean,
    default: true,
  },
}

export default defineComponent({
  name: 'PopButton',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const { t } = useI18n()
    const attrs = useAttrs()

    // get inherit binding value
    const getBindValues = computed(() => {
      return Object.assign(
        {
          okText: t('common.okText'),
          cancelText: t('common.cancelText'),
        },
        { ...props, ...unref(attrs) }
      )
    })

    return () => {
      // 用 omit 剔除一些已知可能导致异常的属性
      const bindValues = omit(unref(getBindValues), 'icon', 'color')
      const btnBind = omit(unref(getBindValues), 'title') as any
      if (btnBind.disabled) btnBind.color = ''
      const Button = h(BasicButton, btnBind, extendSlots(slots))

      if (!props.enable) {
        return Button
      }
      return h(Popconfirm, bindValues, { default: () => Button })
    }
  },
})
</script>
