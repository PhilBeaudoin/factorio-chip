import {
  LuaForce,
  LuaPlayer,
  LuaSurface,
  MapPosition,
  PlayerIndex,
} from 'factorio:runtime'
import { state } from '../../state'
import { chunkPositionToChipIndex } from '../lab/math'
import { posAdd, posMult, posSub } from '../posMath'
import { CHIP_AREA } from '../../constants'
import { compareMaps, entitiesToMap, EntityMap } from './set'
import { destroyOrMine } from '../entities'
import { syncMathingEntities } from './typeSync'

export function syncChipFromLab(labChunk: MapPosition, playerIndex: number) {
  const chipIndex = chunkPositionToChipIndex(labChunk)
  const lab = game.get_surface('lab')
  const nauvis = game.get_surface('nauvis')
  const player = game.get_player(playerIndex as PlayerIndex)
  if (chipIndex === undefined || !lab || !nauvis || !player) return

  const labChunkTopLeft = posMult(labChunk, 32)
  const labMap = findEntities(lab, labChunkTopLeft, player.force, true)

  state.getChunksForChipIndex(chipIndex).forEach((nauvisChunk) =>
    syncChipOnNauvis({
      labMap,
      lab,
      labChunkTopLeft,
      nauvis,
      nauvisChunk,
      player,
    }),
  )
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

  for (const entity of extra) destroyOrMine(entity, player.index)

  for (const entity of missing) {
    const relPos = posSub(entity.position, labChunkTopLeft)
    const newPos = posAdd(nauvisChunkTopLeft, relPos)
    nauvis.create_entity({
      name: 'entity-ghost',
      inner_name: entity.name,
      position: newPos,
      force: player.force,
      player: player,
    })
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
    .filter(
      (e) =>
        !(e.name === 'character' || (noGhosts && e.name === 'entity-ghost')),
    )
  return entitiesToMap(entities, chunkTopLeft)
}
