import { MapPosition } from 'factorio:runtime'
import { resetNauvisChip } from './chip'

export function updateNauvisChunk(chunkPosition: MapPosition) {
  resetNauvisChip(chunkPosition, undefined)
}
