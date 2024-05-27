<script lang="tsx">
import { computed, defineComponent } from 'vue'
import EditTableHeaderCell from './EditTableHeaderIcon.vue'
import BasicHelp from '../../../Basic/src/BasicHelp.vue'
import type { PropType } from 'vue'
import type { BasicColumn } from '../types/table'
import type { ColumnType } from 'ant-design-vue/lib/table/interface'

export default defineComponent({
  name: 'TableHeaderCell',
  components: {
    EditTableHeaderCell,
    BasicHelp,
  },
  props: {
    column: {
      type: Object as PropType<ColumnType<any>>,
      default: () => ({}),
    },
  },
  setup(props) {
    const prefixCls = 'basic-table-header-cell'

    const getIsEdit = computed(() => !!(props.column as BasicColumn)?.edit)
    const getTitle = computed(() => {
      const column = props.column as BasicColumn
      if (typeof column.customHeaderRender === 'function') {
        return column.customHeaderRender(column)
      }
      return column?.customTitle || props.column?.title
    })
    const getHelpMessage = computed(
      () => (props.column as BasicColumn)?.helpMessage
    )

    return () => {
      return (
        <div>
          {getIsEdit.value ? (
            <EditTableHeaderCell>{getTitle.value}</EditTableHeaderCell>
          ) : (
            <span class="default-header-cell">{getTitle.value}</span>
          )}
          {getHelpMessage.value && (
            <BasicHelp
              text={getHelpMessage.value}
              class={`${prefixCls}__help`}
            />
          )}
        </div>
      )
    }
  },
})
</script>
