import {
  BoundingBox,
  LuaEntity,
  MapPosition,
  PlayerIndex,
} from 'factorio:runtime'

export function toChunkPosition(
  val: BoundingBox | MapPosition,
  strict: true,
): MapPosition | undefined
export function toChunkPosition(val: BoundingBox | MapPosition): MapPosition
export function toChunkPosition(
  val: BoundingBox | MapPosition,
  strict = false,
): MapPosition | undefined {
  ;``
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

export const iterateOnChunk = (
  chunkPosition: MapPosition,
  callback: (p: { i: number; j: number; x: number; y: number }) => void,
) => {
  const x = chunkPosition.x * 32
  const y = chunkPosition.y * 32
  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      callback({ i, j, x: x + i, y: y + j })
    }
  }
}

export function destroyOrMine(
  entity: LuaEntity,
  playerIndex: number | undefined,
) {
  if (entity.name === 'character') return
  const player =
    entity.type === 'item-entity'
      ? game.get_player(playerIndex as PlayerIndex)
      : entity.force.players[0]
  if (!player) entity.destroy()
  else player.mine_entity(entity)
}
