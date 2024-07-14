import {
  BoundingBox,
  LuaSurface,
  MapPosition,
  TileWrite,
} from 'factorio:runtime'
import { destroyOrMine, iterateOnChunk } from './utils'
import { isOnBus, isOnChip, isOnPad } from './chips'

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
  destroyChunkObjects(surface, chunkPosition, playerIndex)
}

export function destroyChunkObjects(
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

export function destroyObjectAt(
  surface: LuaSurface,
  position: MapPosition,
  playerIndex: number,
) {
  const entities = surface.find_entities_filtered({
    area: {
      left_top: position,
      right_bottom: { x: position.x + 1, y: position.y + 1 },
    },
  })
  entities.forEach((e) => destroyOrMine(e, playerIndex))
}

export function destroyObjectsAt(
  surface: LuaSurface,
  area: BoundingBox,
  playerIndex: number | undefined,
) {
  const entities = surface.find_entities_filtered({ area })
  entities.forEach((e) => destroyOrMine(e, playerIndex))
}
export function createChipTiles(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  chipTile: string,
  busTile: string,
) {
  const tiles: TileWrite[] = []
  iterateOnChunk(chunkPosition, ({ i, j, x, y }) => {
    const name = isOnChip(i, j)
      ? chipTile
      : isOnBus(i, j) || isOnPad(i, j)
      ? busTile
      : 'out-of-map'
    tiles.push({ name, position: { x, y } })
  })
  surface.set_tiles(tiles, true, false, true, false)
}
