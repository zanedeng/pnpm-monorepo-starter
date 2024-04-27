export function isMacLike(): boolean {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)
}
