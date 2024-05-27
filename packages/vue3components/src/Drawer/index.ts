import { Drawer } from 'ant-design-vue'
import { withInstall } from '../uitls'
import basicDrawer from './src/BasicDrawer.vue'

export const BasicDrawer = withInstall(basicDrawer)
export * from './src/typing'
export { useDrawer, useDrawerInner } from './src/useDrawer'
export { Drawer }
