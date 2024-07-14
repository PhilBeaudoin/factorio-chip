import { LuaSurface, MapPosition } from 'factorio:runtime'
import { PAD_SPACING, stgs } from '../../../modSettings'
import { destroyOrMine } from '../utils'

export function isOnBus(x: number, y: number): boolean {
  x = x % 32
  y = y % 32
  const hw0 = Math.ceil(stgs.busWidth() / 2)
  const hw1 = Math.floor(stgs.busWidth() / 2)
  return x < hw0 || x >= 32 - hw1 || y < hw0 || y >= 32 - hw1
}

export function chipArea(): { x: number; y: number; w: number; h: number } {
  const w = stgs.chipWidth()
  const h = stgs.chipHeight()
  return { x: Math.floor((32 - w) / 2), y: Math.floor((32 - h) / 2), w, h }
}

export function toChipPos(
  x: number,
  y: number,
): { i: number; j: number } | undefined {
  const { x: cax, y: cay, w, h } = chipArea()
  const i = (x % 32) - cax
  const j = (y % 32) - cay
  if (i >= 0 && i < w && j >= 0 && j < h) return { i, j }
  return undefined
}

export function isOnChip(x: number, y: number): boolean {
  return toChipPos(x, y) !== undefined
}

export function isOnPad(x: number, y: number): boolean {
  x = x % 32
  y = y % 32
  const w = stgs.chipWidth()
  const h = stgs.chipHeight()
  const i = x - 16 + Math.floor(w / 2)
  if (i >= 0 && i < w) {
    const nbPad = Math.floor(w / (PAD_SPACING + 1))
    if (nbPad === 0) return false
    const pw = (nbPad - 1) * (PAD_SPACING + 1) + 1
    const pi = x - 16 + Math.floor(pw / 2)
    if (pi < 0 || pi >= pw) return false
    return pi % (PAD_SPACING + 1) === 0
  } else {
    const nbPad = Math.floor(h / (PAD_SPACING + 1))
    if (nbPad === 0) return false
    const ph = (nbPad - 1) * (PAD_SPACING + 1) + 1
    const pj = y - 16 + Math.floor(ph / 2)
    if (pj < 0 || pj >= ph) return false
    return pj % (PAD_SPACING + 1) === 0
  }
}

export const iterateOnChip = (
  chunkPosition: MapPosition,
  callback: (p: { i: number; j: number; x: number; y: number }) => void,
) => {
  const { x: cx, y: cy } = chunkPosition
  const { x: cax, y: cay, w, h } = chipArea()
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
  const { x, y, w, h } = chipArea()
  const { x: cx, y: cy } = chunkPosition
  const entities = surface.find_entities_filtered({
    area: {
      left_top: { x: cx * 32 + x, y: cy * 32 + y },
      right_bottom: { x: cx * 32 + x + w, y: cy * 32 + y + h },
    },
  })
  entities.forEach((e) => destroyOrMine(e, playerIndex))
}
