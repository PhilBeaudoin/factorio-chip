import { BoundingBox, MapPosition } from 'factorio:runtime'
import { BUS_WIDTH } from '../constants'
import { posAdd, posMult } from './posMath'

export function toChunkPosition(
  val: BoundingBox | MapPosition,
  strict: true,
): MapPosition | undefined
export function toChunkPosition(val: BoundingBox | MapPosition): MapPosition
export function toChunkPosition(
  val: BoundingBox | MapPosition,
  strict = false,
): MapPosition | undefined {
  const [x, y] = 'x' in val ? [val.x, val.y] : [val.left_top.x, val.left_top.y]

  // If strict, ensure this is a chunk
  if (strict) {
    if (x % 32 !== 0 || y % 32 !== 0) return undefined
    if ('right_bottom' in val) {
      const w = val.right_bottom.x - x
      const h = val.right_bottom.y - y
      if (w !== 32 || h !== 32) return undefined
    }
  }

  return { x: Math.floor(x / 32), y: Math.floor(y / 32) }
}

export function toChunkBoundingBox(chunkPosition: MapPosition): BoundingBox {
  const left_top = posMult(chunkPosition, 32)
  return { left_top, right_bottom: posAdd(left_top, { x: 32, y: 32 }) }
}

export const iterateOnChunk = (
  chunkPosition: MapPosition,
  callback: (p: { i: number; j: number; x: number; y: number }) => void,
) => {
  const x = chunkPosition.x * 32
  const y = chunkPosition.y * 32
  for (let i = 0; i < 32; i++)
    for (let j = 0; j < 32; j++) callback({ i, j, x: x + i, y: y + j })
}

export function isOnBus(x: number, y: number): boolean {
  x = x % 32
  y = y % 32
  const hw0 = Math.ceil(BUS_WIDTH / 2)
  const hw1 = Math.floor(BUS_WIDTH / 2)
  return x < hw0 || x >= 32 - hw1 || y < hw0 || y >= 32 - hw1
}
