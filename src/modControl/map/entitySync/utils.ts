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
