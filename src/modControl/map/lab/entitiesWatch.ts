import { onBuiltEntity } from '../../events'

let initialized = false

export function registerEntitiesWatchLab() {
  if (initialized) return
  initialized = true
  onBuiltEntity((e) => {
    const entity = e.created_entity
    if (!entity.valid || entity.surface.name !== 'lab') return
    entity.active = false
  })
}
