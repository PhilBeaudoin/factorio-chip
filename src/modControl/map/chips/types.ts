import { LuaSurface, MapPosition } from 'factorio:runtime'
import { resetEmptyChip } from './emptyChip'
import { resetMiningChip } from './miningChip'
import { resetForestChip } from './forestChip'
import { resetNoneChip } from './noneChip'

export const CHIP_TYPES = ['empty', 'mining', 'forest'] as const
export const ALL_CHIP_TYPES = ['none', ...CHIP_TYPES] as const
export type ChipType = (typeof CHIP_TYPES)[number]
export type AllChipType = (typeof ALL_CHIP_TYPES)[number]

type ResetFunction = (
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) => void

export const TILE_SETTER: Record<AllChipType, ResetFunction> = {
  none: resetNoneChip,
  empty: resetEmptyChip,
  mining: resetMiningChip,
  forest: resetForestChip,
}

export function resetChip(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  chipType: AllChipType,
  playerIndex: number | undefined,
) {
  TILE_SETTER[chipType](surface, chunkPosition, playerIndex)
}
