import { MapPosition } from 'factorio:runtime'
import { resetChip } from './chips'
import { createBusTiles, destroyChunkEntities } from './chunk'
import { state } from '../state'

export function updateNauvisChunk(chunkPosition: MapPosition) {
  resetNauvisChip(chunkPosition, undefined)
}

export function resetNauvisChip(
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  const surface = game.get_surface('nauvis')
  if (!surface) return
  createBusTiles(surface, chunkPosition, 'dirt-1')
  destroyChunkEntities(surface, chunkPosition, playerIndex)
  const chipIndex = state.getChipAtChunk(chunkPosition)
  const type = chipIndex !== undefined ? state.getChipType(chipIndex) : 'none'
  resetChip(surface, chunkPosition, type, playerIndex)
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
