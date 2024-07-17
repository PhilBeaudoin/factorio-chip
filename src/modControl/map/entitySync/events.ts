import {
  onBuiltEntity,
  onEachTick,
  onPlayerChangedSurface,
  onPlayerMinedEntity,
} from '../../events'
import { builtEntityLab, leftLab } from './eventsLab'
import { builtEntityNauvis, minedEntityNauvis } from './eventsNauvis'
import { syncQueued } from './main'

let initialized = false

export function registerEntitySyncEvents() {
  if (initialized) return
  initialized = true

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

  onPlayerChangedSurface((e) => {
    if (game.get_surface(e.surface_index)?.name === 'lab')
      leftLab(e.player_index)
  })
}
