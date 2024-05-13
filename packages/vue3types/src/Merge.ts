export type Merge<O extends object, T extends object> = {
  [K in keyof O | keyof T]: K extends keyof T
    ? T[K]
    : K extends keyof O
    ? O[K]
    : never
}
