import { LuaEntity } from 'factorio:runtime'
import { toChunkPosition } from '../chunkMath'
import { syncChipFromLab } from './main'

export function onBuiltEntityLab(entity: LuaEntity, playerIndex: number) {
  if (!entity.valid || entity.surface.name !== 'lab') return
  entity.active = false
  // Create a ghost of this entity on all the matching nauvis chip
  const chunkPosition = toChunkPosition(entity.position)
  syncChipFromLab(chunkPosition, playerIndex)
}
