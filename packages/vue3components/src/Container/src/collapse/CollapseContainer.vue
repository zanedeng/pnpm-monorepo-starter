<script lang="tsx">
import {
  type ExtractPropTypes,
  type PropType,
  defineComponent,
  ref,
  unref,
} from 'vue'
import { Skeleton } from 'ant-design-vue'
import { useTimeoutFn } from '@zkj/vue3hooks'
import { isNil, triggerWindowResize } from '@zkj/utils'
import CollapseHeader from './CollapseHeader.vue'
import { CollapseTransition } from '../../../Transition'

const collapseContainerProps = {
  title: { type: String, default: '' },
  loading: { type: Boolean },
  canExpand: { type: Boolean, default: true },
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  triggerWindowResize: { type: Boolean },
  lazyTime: { type: Number, default: 0 },
}

export type CollapseContainerProps = ExtractPropTypes<
  typeof collapseContainerProps
>

export default defineComponent({
  name: 'CollapseContainer',

  props: collapseContainerProps,

  setup(props, { expose, slots }) {
    const prefixCls = 'collapse-container'

    const show = ref(true)

    const handleExpand = (val: boolean) => {
      show.value = isNil(val) ? !show.value : val
      if (props.triggerWindowResize) {
        // 200 milliseconds here is because the expansion has animation,
        useTimeoutFn(triggerWindowResize, 200)
      }
    }

    expose({ handleExpand })

    return () => (
      <div class={unref(prefixCls)}>
        <CollapseHeader
          {...props}
          prefixCls={unref(prefixCls)}
          onExpand={handleExpand}
          show={show.value}
          v-slots={{
            title: slots.title,
            action: slots.action,
          }}
        />

        <div class="p-2">
          <CollapseTransition enable={props.canExpand}>
            {props.loading ? (
              <Skeleton active={props.loading} />
            ) : (
              <div class={`${prefixCls}__body`} v-show={show.value}>
                {slots.default?.()}
              </div>
            )}
          </CollapseTransition>
        </div>

        {slots.footer && (
          <div class={`${prefixCls}__footer`}>{slots.footer()}</div>
        )}
      </div>
    )
  },
})
</script>
