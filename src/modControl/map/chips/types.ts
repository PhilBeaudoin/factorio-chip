import { LuaSurface, MapPosition } from 'factorio:runtime'
import { resetFlexiChip } from './flexiChip'

export const CHIP_TYPES = ['empty', 'flexi'] as const
export type ChipType = (typeof CHIP_TYPES)[number]

type ResetFunction = (
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) => void

export const TILE_SETTER: Record<ChipType, ResetFunction> = {
  flexi: resetFlexiChip,
  empty: () => {},
}

export function resetChip(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  chipType: ChipType,
  playerIndex: number | undefined,
) {
  TILE_SETTER[chipType](surface, chunkPosition, playerIndex)
}
