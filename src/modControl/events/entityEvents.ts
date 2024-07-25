import {
  OnBuiltEntityEvent,
  OnEntityDestroyedEvent,
  OnMarkedForDeconstructionEvent,
  OnPlayerMinedEntityEvent,
  OnRobotMinedEntityEvent,
} from 'factorio:runtime'
import { addToRegistry, callAll, createRegistry } from './registry'

const BUILT_REGISTRY = createRegistry<OnBuiltEntityEvent>()
script.on_event(defines.events.on_built_entity, (event) => {
  callAll(BUILT_REGISTRY, event)
})
export function onBuiltEntity(f: (e: OnBuiltEntityEvent) => void) {
  return addToRegistry(BUILT_REGISTRY, f)
}

const DESTROYED_REGISTRY = createRegistry<OnEntityDestroyedEvent>()
script.on_event(defines.events.on_entity_destroyed, (event) => {
  callAll(DESTROYED_REGISTRY, event)
})
export function onEntityDestroyed(f: (e: OnEntityDestroyedEvent) => void) {
  return addToRegistry(DESTROYED_REGISTRY, f)
}

const MINED_REGISTRY = createRegistry<OnPlayerMinedEntityEvent>()
script.on_event(defines.events.on_player_mined_entity, (event) => {
  callAll(MINED_REGISTRY, event)
})
export function onPlayerMinedEntity(f: (e: OnPlayerMinedEntityEvent) => void) {
  return addToRegistry(MINED_REGISTRY, f)
}

const ROBOT_MINED_REGISTRY = createRegistry<OnRobotMinedEntityEvent>()
script.on_event(defines.events.on_robot_mined_entity, (event) => {
  callAll(ROBOT_MINED_REGISTRY, event)
})
export function onRobotMinedEntity(f: (e: OnRobotMinedEntityEvent) => void) {
  return addToRegistry(ROBOT_MINED_REGISTRY, f)
}

const DECONSTRUCTION_REGISTRY = createRegistry<OnMarkedForDeconstructionEvent>()
script.on_event(defines.events.on_marked_for_deconstruction, (event) => {
  callAll(DECONSTRUCTION_REGISTRY, event)
})
export function onMarkedForDeconstruction(
  f: (e: OnMarkedForDeconstructionEvent) => void,
) {
  return addToRegistry(DECONSTRUCTION_REGISTRY, f)
}
