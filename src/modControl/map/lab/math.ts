import { MapPosition } from 'factorio:runtime'
import { state } from '../../state'
import { NUM_COL } from './constants'
import { toChunkPosition } from '../chunkMath'

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
