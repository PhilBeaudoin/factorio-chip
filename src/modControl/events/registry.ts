type Func<T> = (e: T) => void

let uid = 0

export type Registry<T = unknown> = { [key: number]: Func<T> }

export const createRegistry = <T = unknown>(): Registry<T> => ({})

export const addToRegistry = <T>(
  registry: Registry<T>,
  f: Func<T>,
): (() => void) => {
  const id = uid++
  registry[id] = f
  return () => delete registry[id]
}

export const callAll = <T>(registry: Registry<T>, e: T) => {
  Object.values(registry).forEach((f) => f(e))
}
