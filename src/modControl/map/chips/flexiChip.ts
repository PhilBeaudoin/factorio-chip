import {
  LuaSurface,
  TileWrite,
  MapPosition,
  SurfaceCreateEntity,
} from 'factorio:runtime'
import { chipArea, clearChipEntities, iterateOnChip } from './utils'

export function resetFlexiChip(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  const tiles: TileWrite[] = []
  const entities: SurfaceCreateEntity[] = []
  const { w, h } = chipArea()
  clearChipEntities(surface, chunkPosition, playerIndex)
  iterateOnChip(chunkPosition, ({ i, j, x, y }) => {
    const position = { x, y }
    if (j < 3) {
      if (i < w / 3) {
        entities.push({ name: 'stone', position, amount: 5000000 })
        tiles.push({ name: 'sand-1', position })
      } else if (i < (w / 3) * 2) {
        entities.push({ name: 'iron-ore', position, amount: 5000000 })
        tiles.push({ name: 'dirt-1', position })
      } else {
        entities.push({ name: 'copper-ore', position, amount: 5000000 })
        tiles.push({ name: 'red-desert-0', position })
      }
    } else if (j >= h - 3) {
      if (i < 3) {
        tiles.push({ name: 'water', position })
      } else if (i > 3 && i < w - 3) {
        entities.push({ name: 'coal', position, amount: 5000000 })
        tiles.push({ name: 'dirt-4', position })
      } else if (i >= w - 3) {
        const name = `tree-0${Math.floor(Math.random() * 6) + 1}`
        entities.push({
          name,
          position: { x: x + 0.5, y: y + 0.5 },
        })
        tiles.push({ name: 'grass-1', position })
      }
    }
  })

  surface.set_tiles(tiles, true, false, true, false)
  entities.forEach((e) =>
    surface.create_entity({ ...e, move_stuck_players: true }),
  )
}
