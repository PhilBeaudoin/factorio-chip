import { onBuiltEntity } from '../../events'
import { onBuiltEntityLab } from './eventsLab'
import { onBuiltEntityNauvis } from './eventsNauvis'

export function registerEntitySyncEvents() {
  onBuiltEntity((e) => {
    if (!e.created_entity.valid) return
    const surface = e.created_entity.surface
    if (surface.name === 'nauvis') {
      onBuiltEntityNauvis(e.created_entity, e.player_index)
    } else if (surface.name === 'lab') {
      onBuiltEntityLab(e.created_entity, e.player_index)
    }
  })
}
