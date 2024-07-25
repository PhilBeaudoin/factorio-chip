import { BoundingBox, LuaSurface } from 'factorio:runtime'
import { toChunkPosition } from './chunkMath'
import { updateNauvisChunk } from './nauvis/chunk'
import { updateLabChunk } from './lab/chunk'
import { debug } from '../debug'
import { resetLabChip } from './lab/chip'

export function clearSurface(surface: LuaSurface) {
  surface.clear(true)
}

export function generateChunk(surface: string, area: BoundingBox) {
  const chunkPosition = toChunkPosition(area, true)
  if (!chunkPosition) {
    debug(`Invalid chunk position: ${area.left_top.x}, ${area.left_top.y}`)
    return
  }
  if (surface === 'nauvis') updateNauvisChunk(chunkPosition)
  else updateLabChunk(chunkPosition)
}

export function generateLabChip(chipIndex: number) {
  resetLabChip(chipIndex, undefined)
}
