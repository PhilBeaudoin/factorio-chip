import { LuaSurface, MapPosition } from 'factorio:runtime'
import { CHIP_AREA } from '../../constants'
import { destroyOrMine } from '../entities'

export function toChipPos(
  x: number,
  y: number,
): { i: number; j: number } | undefined {
  const { x: cax, y: cay, w, h } = CHIP_AREA
  const i = (x % 32) - cax
  const j = (y % 32) - cay
  if (i >= 0 && i < w && j >= 0 && j < h) return { i, j }
  return undefined
}

export function isOnChip(x: number, y: number): boolean {
  return toChipPos(x, y) !== undefined
}

export const iterateOnChip = (
  chunkPosition: MapPosition,
  callback: (p: { i: number; j: number; x: number; y: number }) => void,
) => {
  const { x: cx, y: cy } = chunkPosition
  const { x: cax, y: cay, w, h } = CHIP_AREA
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      callback({ i, j, x: cx * 32 + cax + i, y: cy * 32 + cay + j })
    }
  }
}

export const clearChipEntities = (
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) => {
  const { x, y, w, h } = CHIP_AREA
  const { x: cx, y: cy } = chunkPosition
  const entities = surface.find_entities_filtered({
    area: {
      left_top: { x: cx * 32 + x, y: cy * 32 + y },
      right_bottom: { x: cx * 32 + x + w, y: cy * 32 + y + h },
    },
  })
  entities.forEach((e) => destroyOrMine(e, playerIndex))
}
