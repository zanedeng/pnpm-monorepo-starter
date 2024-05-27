import { Transition, defineComponent } from 'vue'
import { getSlot } from '../../uitls'
import type { Recordable } from '@zkj/vue3types'
import type { PropType } from 'vue'

type Mode = 'in-out' | 'out-in' | 'default' | undefined

export function createJavascriptTransition(
  name: string,
  functions: Recordable,
  mode: Mode = 'in-out'
) {
  return defineComponent({
    name,
    props: {
      mode: {
        type: String as PropType<Mode>,
        default: mode,
      },
    },
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <Transition
            name={name}
            mode={props.mode}
            {...attrs}
            onBeforeEnter={functions.beforeEnter}
            onEnter={functions.enter}
            onLeave={functions.leave}
            onAfterLeave={functions.afterLeave}
            onLeaveCancelled={functions.afterLeave}
          >
            {() => getSlot(slots)}
          </Transition>
        )
      }
    },
  })
}
