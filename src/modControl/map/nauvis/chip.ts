import { MapPosition } from 'factorio:runtime'
import { createBusTiles, destroyChunkEntities } from '../chunk'
import { resetChip } from '../chips'
import { state } from '../../state'
import { syncChipAtNauvisChunk } from '../entitySync/main'

export function resetNauvisChip(
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  const surface = game.get_surface('nauvis')
  if (!surface) return
  createBusTiles(surface, chunkPosition, 'factorio-chip-nauvis-bus')
  destroyChunkEntities(surface, chunkPosition, playerIndex)
  const chipIndex = state.getChipAtChunk(chunkPosition)
  const type = chipIndex !== undefined ? state.getChipType(chipIndex) : 'none'
  resetChip(surface, chunkPosition, type, playerIndex)
  if (playerIndex !== undefined)
    syncChipAtNauvisChunk(chunkPosition, playerIndex)
}

export function resetAllNauvisChipsForIndex(
  chipIndex: number,
  playerIndex: number | undefined,
) {
  const surface = game.get_surface('nauvis')
  if (!surface) return
  const chunkPositions = state.getChunksForChipIndex(chipIndex)
  for (const chunkPosition of chunkPositions)
    resetNauvisChip(chunkPosition, playerIndex)
}
