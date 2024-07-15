import {
  BoundingBox,
  LuaEntity,
  LuaSurface,
  MapPosition,
  PlayerIndex,
} from 'factorio:runtime'

export function destroyEntitiesAt(
  surface: LuaSurface,
  posOrArea: MapPosition | BoundingBox,
  playerIndex: number | undefined,
) {
  if ('x' in posOrArea)
    destroyEntitiesAtPosition(surface, posOrArea, playerIndex)
  else destroyEntitiesAtBoundingBox(surface, posOrArea, playerIndex)
}

function destroyEntitiesAtPosition(
  surface: LuaSurface,
  position: MapPosition,
  playerIndex: number | undefined,
) {
  const entities = surface.find_entities_filtered({
    area: {
      left_top: position,
      right_bottom: { x: position.x + 1, y: position.y + 1 },
    },
  })
  entities.forEach((e) => destroyOrMine(e, playerIndex))
}

function destroyEntitiesAtBoundingBox(
  surface: LuaSurface,
  area: BoundingBox,
  playerIndex: number | undefined,
) {
  const entities = surface.find_entities_filtered({ area })
  entities.forEach((e) => destroyOrMine(e, playerIndex))
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

export function ensureCharactersCanMove(
  surface: LuaSurface,
  area?: BoundingBox,
) {
  surface.find_entities_filtered({ type: 'character', area }).forEach((c) => {
    const { x, y } = c.position
    if (!surface.get_tile(x, y).collides_with('player-layer')) return
    const p = surface.find_non_colliding_position(
      'character',
      c.position,
      32,
      0.2,
    )
    if (p) c.teleport(p)
  })
}
