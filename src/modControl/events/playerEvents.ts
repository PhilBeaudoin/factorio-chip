import {
  OnPlayerChangedPositionEvent,
  OnPlayerChangedSurfaceEvent,
  OnPlayerCreatedEvent,
  OnPlayerDiedEvent,
} from 'factorio:runtime'
import { addToRegistry, callAll, createRegistry, Registry } from './registry'
import { optionalNumber } from './utils'

function onGeneric<T extends { player_index: number }>(
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

const CREATED_REGISTRY = createRegistry<OnPlayerCreatedEvent>()
script.on_event(defines.events.on_player_created, (event) => {
  callAll(CREATED_REGISTRY, event)
})
export function onPlayerCreated(
  f: (e: OnPlayerCreatedEvent) => void,
): () => void
export function onPlayerCreated(
  playerIndex: number,
  f: (e: OnPlayerCreatedEvent) => void,
): () => void
export function onPlayerCreated(
  p1: number | ((e: OnPlayerCreatedEvent) => void),
  p2?: (e: OnPlayerCreatedEvent) => void,
) {
  return onGeneric(CREATED_REGISTRY, p1, p2)
}

const DIED_REGISTRY = createRegistry<OnPlayerDiedEvent>()
script.on_event(defines.events.on_player_died, (event) => {
  callAll(DIED_REGISTRY, event)
})
export function onPlayerDied(f: (e: OnPlayerDiedEvent) => void): () => void
export function onPlayerDied(
  playerIndex: number,
  f: (e: OnPlayerDiedEvent) => void,
): () => void
export function onPlayerDied(
  p1: number | ((e: OnPlayerDiedEvent) => void),
  p2?: (e: OnPlayerDiedEvent) => void,
) {
  return onGeneric(DIED_REGISTRY, p1, p2)
}

const CHANGED_SURFACE_REGISTRY = createRegistry<OnPlayerChangedSurfaceEvent>()
script.on_event(defines.events.on_player_changed_surface, (event) => {
  callAll(CHANGED_SURFACE_REGISTRY, event)
})
export function onPlayerChangedSurface(
  f: (e: OnPlayerChangedSurfaceEvent) => void,
): () => void
export function onPlayerChangedSurface(
  playerIndex: number,
  f: (e: OnPlayerChangedSurfaceEvent) => void,
): () => void
export function onPlayerChangedSurface(
  p1: number | ((e: OnPlayerChangedSurfaceEvent) => void),
  p2?: (e: OnPlayerChangedSurfaceEvent) => void,
) {
  return onGeneric(CHANGED_SURFACE_REGISTRY, p1, p2)
}

const CHANGED_POSITION_REGISTRY = createRegistry<OnPlayerChangedPositionEvent>()
script.on_event(defines.events.on_player_changed_position, (event) => {
  callAll(CHANGED_POSITION_REGISTRY, event)
})
export function onPlayerChangedPosition(
  f: (e: OnPlayerChangedPositionEvent) => void,
): () => void
export function onPlayerChangedPosition(
  playerIndex: number,
  f: (e: OnPlayerChangedPositionEvent) => void,
): () => void
export function onPlayerChangedPosition(
  p1: number | ((e: OnPlayerChangedPositionEvent) => void),
  p2?: (e: OnPlayerChangedPositionEvent) => void,
) {
  return onGeneric(CHANGED_POSITION_REGISTRY, p1, p2)
}
