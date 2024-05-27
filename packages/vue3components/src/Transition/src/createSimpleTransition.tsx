import { Transition, TransitionGroup, defineComponent } from 'vue'
import { getSlot } from '../../uitls'
import type { PropType } from 'vue'

type Mode = 'in-out' | 'out-in' | 'default' | undefined

export function createSimpleTransition(
  name: string,
  origin = 'top center 0',
  mode?: Mode
) {
  return defineComponent({
    name,
    props: {
      group: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      mode: {
        type: String as PropType<Mode>,
        default: mode,
      },
      origin: {
        type: String as PropType<string>,
        default: origin,
      },
    },
    setup(props, { slots, attrs }) {
      const onBeforeEnter = (el: Element) => {
        ;(el as HTMLElement).style.transformOrigin = props.origin
      }

      return () => {
        const Tag = !props.group ? Transition : TransitionGroup
        return (
          <Tag
            name={name}
            mode={props.mode}
            {...attrs}
            onBeforeEnter={onBeforeEnter}
          >
            {() => getSlot(slots)}
          </Tag>
        )
      }
    },
  })
}
