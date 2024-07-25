import { PlayerIndex } from 'factorio:runtime'
import {
  onBuiltEntity,
  onEachTick,
  onMarkedForDeconstruction,
  onPlayerChangedSurface,
  onPlayerMinedEntity,
} from '../../events'
import { builtEntityLab, leftLab } from './eventsLab'
import { builtEntityNauvis, minedEntityNauvis } from './eventsNauvis'
import { syncQueued } from './main'
import { LEGAL_ON_BUS } from '../../../modData/constants'

////// EVENTS //////

onEachTick(() => syncQueued())

onBuiltEntity((e) => {
  if (!e.created_entity.valid) return
  const surface = e.created_entity.surface
  if (surface.name === 'nauvis')
    builtEntityNauvis(e.created_entity, e.player_index)
  else if (surface.name === 'lab')
    builtEntityLab(e.created_entity, e.player_index)
})

onPlayerMinedEntity((e) => {
  if (!e.entity.valid) return
  const surface = e.entity.surface
  if (surface.name === 'nauvis') minedEntityNauvis(e.entity, e.player_index)
})

onMarkedForDeconstruction((e) => {
  if (!e.entity.valid) return
  const surface = e.entity.surface
  if (surface.name !== 'nauvis') return
  const player = game.get_player(e.player_index as PlayerIndex)
  if (!player) return
  if (LEGAL_ON_BUS.includes(e.entity.type)) {
    const {
      left_top: { x: x1, y: y1 },
      right_bottom: { x: x2, y: y2 },
    } = e.entity.bounding_box
    let allBus = true
    for (let x = math.floor(x1); x < math.ceil(x2); x++) {
      for (let y = math.floor(y1); y < math.ceil(y2); y++) {
        if (surface.get_tile(x, y).name !== 'factorio-chip-nauvis-bus') {
          allBus = false
          break
        }
      }
    }
    if (allBus) return
  }
  e.entity.cancel_deconstruction(player.force, player.index)
})

onPlayerChangedSurface((e) => {
  if (game.get_surface(e.surface_index)?.name === 'lab') leftLab(e.player_index)
})
