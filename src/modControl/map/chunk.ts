import { LuaSurface, MapPosition, TileWrite } from 'factorio:runtime'
import { isOnBus, iterateOnChunk } from './chunkMath'
import { destroyOrMine } from './entities'

export function destroyChunk(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  const tiles: TileWrite[] = []
  iterateOnChunk(chunkPosition, ({ x, y }) => {
    tiles.push({ name: 'out-of-map', position: { x, y } })
  })
  surface.set_tiles(tiles, true, false, true, false)
  destroyChunkEntities(surface, chunkPosition, playerIndex)
}

export function destroyChunkEntities(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  const [cx, cy] = [chunkPosition.x, chunkPosition.y]
  const area = {
    left_top: { x: cx * 32, y: cy * 32 },
    right_bottom: { x: cx * 32 + 32, y: cy * 32 + 32 },
  }
  surface.destroy_decoratives({ area })
  surface.find_entities(area).forEach((e) => destroyOrMine(e, playerIndex))
}

export function createBusTiles(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  busTile: string,
) {
  const tiles: TileWrite[] = []
  iterateOnChunk(chunkPosition, ({ i, j, x, y }) => {
    if (isOnBus(i, j)) tiles.push({ name: busTile, position: { x, y } })
  })
  surface.set_tiles(tiles, true, false, true, false)
}
