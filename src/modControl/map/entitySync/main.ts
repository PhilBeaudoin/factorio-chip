import {
  LuaEntity,
  LuaForce,
  LuaPlayer,
  LuaSurface,
  MapPosition,
  PlayerIndex,
} from 'factorio:runtime'
import { state } from '../../state'
import { chipIndexToChunkPosition } from '../lab/math'
import { posAdd, posMult, posSub } from '../posMath'
import { CHIP_AREA } from '../../constants'
import { compareMaps, entitiesToMap, EntityMap } from './set'
import { destroyOrMine } from '../entities'
import { syncMathingEntities } from './typeSync'
import { LEGAL_ON_BUS } from '../../../modData/constants'
import { isInputBelt, isOutputBelt } from './utils'

export function syncAllChips(playerIndex: number) {
  for (let i = 0; i < state.getNumChips(); i++) syncChipFromLab(i, playerIndex)
}

export function syncChipAtNauvisChunk(
  nauvisChunk: MapPosition,
  playerIndex: number,
) {
  const chipIndex = state.getChipAtChunk(nauvisChunk)
  if (chipIndex === undefined) return
  syncChipFromLab(chipIndex, playerIndex, nauvisChunk)
}

// If no nauvisChunk is provided, sync all chunks for the chip
function syncChipFromLab(
  chipIndex: number,
  playerIndex: number,
  nauvisChunk?: MapPosition,
) {
  const labChunk = chipIndexToChunkPosition(chipIndex)
  const lab = game.get_surface('lab')
  const nauvis = game.get_surface('nauvis')
  const player = game.get_player(playerIndex as PlayerIndex)
  if (chipIndex === undefined || !lab || !nauvis || !player) return

  const labChunkTopLeft = posMult(labChunk, 32)
  const labMap = findEntities(lab, labChunkTopLeft, player.force, true)

  const sync = (nc: MapPosition) =>
    syncChipOnNauvis({
      labMap,
      lab,
      labChunkTopLeft,
      nauvis,
      nauvisChunk: nc,
      player,
    })

  if (nauvisChunk) sync(nauvisChunk)
  else state.getChunksForChipIndex(chipIndex).forEach((nc) => sync(nc))
}

interface SyncChipOnNauvisParams {
  labMap: EntityMap
  lab: LuaSurface
  labChunkTopLeft: MapPosition
  nauvis: LuaSurface
  nauvisChunk: MapPosition
  player: LuaPlayer
}

function syncChipOnNauvis({
  labMap,
  labChunkTopLeft,
  nauvis,
  nauvisChunk,
  player,
}: SyncChipOnNauvisParams) {
  const nauvisChunkTopLeft = posMult(nauvisChunk, 32)
  const nauvisMap = findEntities(
    nauvis,
    nauvisChunkTopLeft,
    player.force,
    false,
  )
  const { missing, extra, matching } = compareMaps(labMap, nauvisMap)
  fixUndergroundBelts(missing)

  for (const entity of extra) destroyOrMine(entity, player.index)

  for (const entity of missing) {
    const relPos = posSub(entity.position, labChunkTopLeft)
    const newPos = posAdd(nauvisChunkTopLeft, relPos)
    const direction = isOutputBelt(entity)
      ? (entity.direction + 4) % 8
      : entity.direction
    const ghost = nauvis.create_entity({
      name: 'entity-ghost',
      inner_name: entity.name,
      position: newPos,
      direction,
      orientation: entity.orientation,
      force: player.force,
      player: player,
    })
    if (ghost) syncMathingEntities(entity, ghost, player)
  }

  for (const [labEntity, nauvisEntity] of matching)
    syncMathingEntities(labEntity, nauvisEntity, player)
}

function findEntities(
  surface: LuaSurface,
  chunkTopLeft: MapPosition,
  force: LuaForce,
  noGhosts: boolean,
): EntityMap {
  const left_top = posAdd(chunkTopLeft, CHIP_AREA)
  const right_bottom = posAdd(left_top, { x: CHIP_AREA.w, y: CHIP_AREA.h })
  const entities = surface
    .find_entities_filtered({ area: { left_top, right_bottom }, force })
    .filter((e) => {
      if (e.name === 'character') return false
      if (noGhosts && e.name === 'entity-ghost') return false
      if (
        LEGAL_ON_BUS.includes(e.type) &&
        surface.get_tile(e.position.x, e.position.y).name ===
          'factorio-chip-nauvis-bus'
      )
        return false
      return true
    })
  return entitiesToMap(entities, chunkTopLeft)
}

function fixUndergroundBelts(entities: LuaEntity[]) {
  const moveToBack: number[] = []
  for (const [i, entity] of entities.entries())
    if (isInputBelt(entity)) moveToBack.push(i)
  moveToBack.reverse()
  for (const i of moveToBack) entities.push(entities[i])
  for (const i of moveToBack) entities.splice(i, 1)
}

interface SyncInfo {
  nauvisChunk: MapPosition
  playerIndex: number
}
const TO_SYNC: SyncInfo[] = []

export function addToSyncQueue(nauvisChunk: MapPosition, playerIndex: number) {
  TO_SYNC.push({ nauvisChunk, playerIndex })
}

export function syncQueued() {
  for (const { nauvisChunk, playerIndex } of TO_SYNC)
    syncChipAtNauvisChunk(nauvisChunk, playerIndex)
  TO_SYNC.length = 0
}
