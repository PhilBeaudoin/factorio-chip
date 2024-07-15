// A template is a string of 28 * 28 characters describing a square chip.
// Valid characters are:
// - ' ' (space) for empty space
// - '.' for background tiles
// - 'o' for bus tiles
// - 't' for trees
// - '~' for water
// - 'i' for iron ore
// - 'c' for copper ore
// - 's' for stone
// - 'x' for coal

import {
  LuaSurface,
  MapPosition,
  SurfaceCreateEntity,
  TileWrite,
} from 'factorio:runtime'
import { debug } from '../../debug'
import { posAdd, posMult } from '../posMath'
import { CHIP_AREA } from '../../constants'
import { clearChipEntities } from './utils'
import { ensureCharactersCanMove } from '../entities'

export function resetChipFromTemplate(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
  template: string,
) {
  if (template.length !== CHIP_AREA.w * CHIP_AREA.h) {
    debug('Invalid template length')
    return
  }
  clearChipEntities(surface, chunkPosition, playerIndex)
  const busTile = surface.name === 'nauvis' ? 'dirt-1' : 'lab-bus'
  const backgroundTile =
    surface.name === 'nauvis' ? 'grass-1' : 'refined-concrete'
  const topLeft = posAdd(posMult(chunkPosition, 32), CHIP_AREA)
  const tiles: TileWrite[] = []
  const entities: SurfaceCreateEntity[] = []
  for (let i = 0; i < CHIP_AREA.w; i++) {
    for (let j = 0; j < CHIP_AREA.h; j++) {
      const c = template.charAt(i + j * 28)
      const position = posAdd(topLeft, { x: i, y: j })
      tiles.push({ name: charToTile(c, backgroundTile, busTile), position })
      const entity = charToEntity(c, position)
      if (entity) entities.push(entity)
    }
  }

  surface.set_tiles(tiles, true, false, true, false)
  entities.forEach((e) =>
    surface.create_entity({ ...e, move_stuck_players: true }),
  )
  ensureCharactersCanMove(surface, {
    left_top: topLeft,
    right_bottom: posAdd(topLeft, { x: CHIP_AREA.w, y: CHIP_AREA.h }),
  })
}

function charToTile(
  c: string,
  backgroundTile: string,
  busTile: string,
): string {
  switch (c) {
    case ' ':
      return 'out-of-map'
    case 't':
      return backgroundTile
    case '~':
      return 'water'
    case 'i':
      return 'sand-1'
    case 'c':
      return 'sand-2'
    case 's':
      return 'sand-3'
    case 'x':
      return 'sand-3'
    case 'o':
      return busTile
    default:
      return backgroundTile
  }
}

function charToEntity(
  c: string,
  position: MapPosition,
): SurfaceCreateEntity | undefined {
  switch (c) {
    case 't':
      return {
        name: `tree-0${Math.floor(Math.random() * 6) + 1}`,
        position: posAdd(position, { x: 0.5, y: 0.5 }),
      }
    case 'i':
      return { name: 'iron-ore', position, amount: 5000000 }
    case 'c':
      return { name: 'copper-ore', position, amount: 5000000 }
    case 's':
      return { name: 'stone', position, amount: 5000000 }
    case 'x':
      return { name: 'coal', position, amount: 5000000 }
    default:
      return undefined
  }
}
