import { MapPosition } from 'factorio:runtime'
import { destroyChunk } from '../chunk'
import { posAdd, posMult } from '../posMath'
import { ensureCharactersCanMove } from '../entities'
import { chunkPositionToChipIndex } from './math'
import { resetLabChip } from './chip'

export function updateLabChunk(chunkPosition: MapPosition) {
  const chipIndex = chunkPositionToChipIndex(chunkPosition)
  if (chipIndex === undefined) {
    const surface = game.get_surface('lab')
    if (!surface) return
    destroyChunk(surface, chunkPosition, undefined)
    const left_top = posMult(chunkPosition, 32)
    ensureCharactersCanMove(surface, {
      left_top,
      right_bottom: posAdd(left_top, { x: 32, y: 32 }),
    })
  } else {
    resetLabChip(chipIndex, undefined)
  }
}
