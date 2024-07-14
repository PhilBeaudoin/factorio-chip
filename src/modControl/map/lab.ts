import { LuaSurface, MapPosition } from 'factorio:runtime'
import { state } from '../state'
import { stgs } from '../../modSettings'
import { write } from './text'
import {
  createChipTiles,
  destroyChunk,
  destroyChunkObjects,
  destroyObjectsAt,
} from './map'
import { toChunkPosition } from './utils'
import { resetChip } from './chips'

const NUM_COL = 5

export function updateLabChunk(chunkPosition: MapPosition) {
  const surface = game.get_surface('lab')
  if (!surface) return
  const chipIndex = chunkPositionToChipIndex(chunkPosition)
  if (chipIndex === undefined) {
    destroyChunk(surface, chunkPosition, undefined)
    return
  }
  resetChipInternal(surface, chunkPosition, chipIndex, undefined)
}

export function writeChipName(chipIndex: number) {
  const surface = game.get_surface('lab')
  if (!surface) return
  const { x: cx, y: cy } = chipIndexToChunkPosition(chipIndex)
  const delta = Math.ceil(stgs.busWidth() / 2) + 1
  const x = cx * 32 + delta
  const y = cy * 32 + delta
  const maxLength = 32 - 2 * delta
  const area = {
    left_top: { x, y },
    right_bottom: { x: x + maxLength, y: y + 1 },
  }
  destroyObjectsAt(surface, area, undefined)
  const name = state.getChipName(chipIndex).slice(0, maxLength)
  write(surface, cx * 32 + delta, cy * 32 + delta, name)
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

function resetChipInternal(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  chipIndex: number,
  playerIndex: number | undefined,
) {
  createChipTiles(
    surface,
    chunkPosition,
    'refined-concrete',
    'hazard-concrete-left',
  )
  destroyChunkObjects(surface, chunkPosition, playerIndex)
  const type = state.getChipType(chipIndex)
  resetChip(surface, chunkPosition, type, playerIndex)
  writeChipName(chipIndex)
}

export function resetLabChip(
  chipIndex: number,
  playerIndex: number | undefined,
) {
  const surface = game.get_surface('lab')
  if (!surface) return
  const chunkPosition = chipIndexToChunkPosition(chipIndex)
  resetChipInternal(surface, chunkPosition, chipIndex, playerIndex)
}
