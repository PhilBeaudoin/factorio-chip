import { MapPosition } from 'factorio:runtime'
import { createChipTiles, destroyChunkObjects } from './map'

export function updateNauvisChunk(chunkPosition: MapPosition) {
  const surface = game.get_surface('nauvis')
  if (!surface) return
  createChipTiles(surface, chunkPosition, 'grass-1', 'dirt-1')
  destroyChunkObjects(surface, chunkPosition, undefined)
}
