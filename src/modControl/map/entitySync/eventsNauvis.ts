import { EntityType } from 'factorio:prototype'
import { destroyOrMine } from '../entities'
import { LuaEntity } from 'factorio:runtime'

const ENTITIES_ALLOWED_ON_BUS: EntityType[] = [
  'transport-belt',
  'splitter',
  'underground-belt',
  'electric-pole',
  'pipe',
  'pipe-to-ground',
] as const

export function onBuiltEntityNauvis(entity: LuaEntity, playerIndex: number) {
  if (!entity.valid) return
  const surface = entity.surface
  if (surface.name !== 'nauvis') return
  if (ENTITIES_ALLOWED_ON_BUS.includes(entity.type)) return
  const {
    left_top: { x: x1, y: y1 },
    right_bottom: { x: x2, y: y2 },
  } = entity.bounding_box
  for (let x = Math.floor(x1); x < Math.ceil(x2); x++) {
    for (let y = Math.floor(y1); y < Math.ceil(y2); y++) {
      if (surface.get_tile(x, y).name === 'nauvis-bus')
        destroyOrMine(entity, playerIndex)
    }
  }
}
