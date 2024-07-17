import { state } from '../../state'
import { resetChip } from '../chips'
import { createBusTiles, destroyChunkEntities } from '../chunk'
import { writeChipName } from './text'
import { chipIndexToChunkPosition } from './math'

export function resetLabChip(
  chipIndex: number,
  playerIndex: number | undefined,
) {
  const surface = game.get_surface('lab')
  if (!surface) return
  const chunkPosition = chipIndexToChunkPosition(chipIndex)
  createBusTiles(surface, chunkPosition, 'factorio-chip-lab-bus')
  destroyChunkEntities(surface, chunkPosition, playerIndex)
  const type = state.getChipType(chipIndex)
  resetChip(surface, chunkPosition, type, playerIndex)
  writeChipName(chipIndex)
}
