import { LuaEntity } from 'factorio:runtime'

export function isTypeOrGhost(entity: LuaEntity, type: string): boolean {
  return (
    entity.type === type ||
    (entity.name === 'entity-ghost' && entity.ghost_type === type)
  )
}

export function isNameOrGhost(entity: LuaEntity, name: string): boolean {
  return (
    entity.name === name ||
    (entity.name === 'entity-ghost' && entity.ghost_name === name)
  )
}

export function isInputBelt(entity: LuaEntity) {
  return (
    entity.type === 'underground-belt' && entity.belt_to_ground_type === 'input'
  )
}

export function isOutputBelt(entity: LuaEntity) {
  return (
    entity.type === 'underground-belt' &&
    entity.belt_to_ground_type === 'output'
  )
}

export function mismatchedBelts(e1: LuaEntity, e2: LuaEntity) {
  if (e1.type !== 'underground-belt' || e2.type !== 'underground-belt')
    return false
  if (e1.belt_to_ground_type !== e2.belt_to_ground_type) return true
  if (e1.direction !== e2.direction) return true
  return false
}
