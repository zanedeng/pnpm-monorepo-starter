import icon from './src/Icon.vue'
import svgIcon from './src/SvgIcon.vue'

import { withInstall } from '../uitls'

export const Icon = withInstall(icon)
export const SvgIcon = withInstall(svgIcon)

export * from './src/components'
