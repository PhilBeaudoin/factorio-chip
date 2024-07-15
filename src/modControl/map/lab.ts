import { MapPosition } from 'factorio:runtime'
import { state } from '../state'
import { write } from './text'
import { toChunkPosition } from './chunkMath'
import { resetChip } from './chips'
import { createBusTiles, destroyChunk, destroyChunkEntities } from './chunk'
import { posAdd, posMult } from './posMath'
import { destroyEntitiesAt, ensureCharactersCanMove } from './entities'

const NUM_COL = 5

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

export function writeChipName(chipIndex: number) {
  const surface = game.get_surface('lab')
  if (!surface) return
  const { x: cx, y: cy } = chipIndexToChunkPosition(chipIndex)
  const left_top = { x: cx * 32, y: cy * 32 }
  const right_bottom = posAdd(left_top, { x: 32, y: 1 })
  const area = { left_top, right_bottom }
  destroyEntitiesAt(surface, area, undefined)
  const name = state.getChipName(chipIndex).slice(0, 32)
  write(surface, left_top.x, left_top.y, name)
}

export function chipIndexToChunkPosition(chipIndex: number): MapPosition {
  const numChips = state.getNumChips()
  chipIndex = Math.max(Math.min(chipIndex, numChips - 1), 0)
  const cx = chipIndex % NUM_COL
  const cy = Math.floor(chipIndex / NUM_COL)
  return { x: cx, y: cy }
}

export function chunkPositionToChipIndex(
  chunkPosition: MapPosition,
): number | undefined {
  const { x: cx, y: cy } = chunkPosition
  const numChips = state.getNumChips()
  const chipIdx = cy * NUM_COL + cx
  if (cx < 0 || cy < 0 || cx >= NUM_COL || chipIdx >= numChips) return undefined
  return chipIdx
}

export function positionToChipIndex(position: MapPosition): number | undefined {
  return chunkPositionToChipIndex(toChunkPosition(position))
}

export function resetLabChip(
  chipIndex: number,
  playerIndex: number | undefined,
) {
  const surface = game.get_surface('lab')
  if (!surface) return
  const chunkPosition = chipIndexToChunkPosition(chipIndex)
  createBusTiles(surface, chunkPosition, 'lab-bus')
  destroyChunkEntities(surface, chunkPosition, playerIndex)
  const type = state.getChipType(chipIndex)
  resetChip(surface, chunkPosition, type, playerIndex)
  writeChipName(chipIndex)
}
