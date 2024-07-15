import { EntityType } from 'factorio:prototype'
import { onBuiltEntity } from '../../events'
import { destroyOrMine } from '../entities'

const ENTITIES_ALLOWED_ON_BUS: EntityType[] = [
  'transport-belt',
  'splitter',
  'underground-belt',
  'electric-pole',
  'pipe',
  'pipe-to-ground',
] as const

let initialized = false
export function registerEntitiesWatchNauvis() {
  if (initialized) return
  initialized = true
  onBuiltEntity((e) => {
    const entity = e.created_entity
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
          destroyOrMine(entity, e.player_index)
      }
    }
  })
}
