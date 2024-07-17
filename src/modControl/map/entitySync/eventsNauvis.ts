import { LuaEntity } from 'factorio:runtime'
import { addToSyncQueue, syncChipAtNauvisChunk } from './main'
import { toChunkPosition } from '../chunkMath'

export function builtEntityNauvis(entity: LuaEntity, playerIndex: number) {
  if (!entity.valid) return
  syncChipAtNauvisChunk(toChunkPosition(entity.position), playerIndex)
}

export function minedEntityNauvis(entity: LuaEntity, playerIndex: number) {
  if (!entity.valid) return
  addToSyncQueue(toChunkPosition(entity.position), playerIndex)
}
