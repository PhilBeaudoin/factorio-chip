import { LuaSurface, OnChunkGeneratedEvent } from 'factorio:runtime'
import { toChunkPosition } from './utils'
import { updateNauvisChunk } from './nauvis'
import { updateLabChunk } from './lab'
import { debug } from '../debug'

export function clearSurface(surface: LuaSurface) {
  surface.clear(true)
}

export function generateChunk(e: OnChunkGeneratedEvent) {
  const chunkPosition = toChunkPosition(e.area, true)
  if (!chunkPosition) {
    debug(`Invalid chunk position: ${e.area.left_top.x}, ${e.area.left_top.y}`)
    return
  }
  if (e.surface.name === 'nauvis') updateNauvisChunk(chunkPosition)
  else updateLabChunk(chunkPosition)
}
