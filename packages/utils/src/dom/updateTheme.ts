import { addClass } from './addClass'
import { hasClass } from './hasClass'
import { removeClass } from './removeClass'

export function updateTheme(mode: string | null = 'light') {
  const htmlRoot = document.documentElement
  if (!htmlRoot) {
    return
  }
  const hasDarkClass = hasClass(htmlRoot, 'dark')
  if (mode === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark')
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark')
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light')
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark')
    }
  }
}
