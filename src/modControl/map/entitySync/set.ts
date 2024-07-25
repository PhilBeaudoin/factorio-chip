import { LuaEntity, MapPosition } from 'factorio:runtime'
import { posSub } from '../posMath'
import { mismatchedBelts } from './utils'

function entityToKey(entity: LuaEntity, topLeft: MapPosition): string {
  const name = entity.name === 'entity-ghost' ? entity.ghost_name : entity.name
  const relPos = posSub(entity.position, topLeft)
  return `${name}#${relPos.x},${relPos.y}`
}

export type EntityMap = { [key: string]: LuaEntity }

export function entitiesToMap(
  entities: LuaEntity[],
  topLeft: MapPosition,
): EntityMap {
  const map: EntityMap = {}
  for (const entity of entities) {
    map[entityToKey(entity, topLeft)] = entity
  }
  return map
}

interface MapDiff {
  missing: LuaEntity[]
  extra: LuaEntity[]
  matching: [LuaEntity, LuaEntity][]
}

export function compareMaps(lab: EntityMap, nauvis: EntityMap): MapDiff {
  const missing: LuaEntity[] = []
  const extra: LuaEntity[] = []
  const matching: [LuaEntity, LuaEntity][] = []

  for (const key in lab) {
    const labEntity = lab[key]
    const nauvisEntity = nauvis[key]
    if (!nauvisEntity) {
      missing.push(labEntity)
    } else if (mismatchedBelts(labEntity, nauvisEntity)) {
      missing.push(labEntity)
      extra.push(nauvisEntity)
    } else {
      matching.push([labEntity, nauvisEntity])
    }
  }

  for (const key in nauvis) if (!lab[key]) extra.push(nauvis[key])

  return { missing, extra, matching }
}
