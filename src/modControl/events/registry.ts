import { LuaGuiElement } from 'factorio:runtime'
import { optionalNumber } from './utils'

type Func<T> = (e: T) => void

export type Registry<T = unknown> = { [key: number]: Func<T> }

export const createRegistry = <T = unknown>(): Registry<T> => ({})

// OK to keep local, functions are re-registered every time
let uid = 0

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

export function onPlayerEvent<T extends { player_index: number }>(
  registry: Registry<T>,
  p1: number | ((e: T) => void),
  p2?: (e: T) => void,
) {
  const { n: playerIndex, f } = optionalNumber(p1, p2)
  if (playerIndex === undefined) return addToRegistry(registry, f)
  return addToRegistry(registry, (e) => {
    if (e.player_index === playerIndex) f(e)
  })
}

export function onNamedPlayerEvent<
  T extends { element?: LuaGuiElement; player_index: number },
>(
  registry: Registry<T>,
  name: string,
  p1: number | ((e: T) => void),
  p2?: (e: T) => void,
) {
  const { n: playerIndex, f } = optionalNumber(p1, p2)
  if (playerIndex === undefined)
    return addToRegistry(registry, (e) => {
      if (e.element?.valid && e.element.name === name) {
        f(e)
      }
    })
  return addToRegistry(registry, (e) => {
    if (
      e.element?.valid &&
      e.element.name === name &&
      e.player_index === playerIndex
    ) {
      f(e)
    }
  })
}
