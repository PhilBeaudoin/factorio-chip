import { EntityPrototypeFlags } from 'factorio:prototype'
import { NAUVIS_BUS_LAYER } from './data'
import { LEGAL_ON_BUS } from './constants'

// From: https://lua-api.factorio.com/latest/prototypes/EntityPrototype.html#collision_mask
const DEFAULT: string[] = [
  'item-layer',
  'object-layer',
  'player-layer',
  'water-tile',
]

export function disablePlacementOnNauvisBus() {
  for (const category of Object.values(data.raw)) {
    for (const proto of Object.values(category)) {
      if (LEGAL_ON_BUS.includes(proto.type) || !('flags' in proto)) continue
      const flags: EntityPrototypeFlags = proto.flags ?? []
      if (flags.includes('placeable-player')) {
        proto.collision_mask = [
          ...(proto.collision_mask ?? DEFAULT),
          NAUVIS_BUS_LAYER,
        ]
      }
      if ('center_collision_mask' in proto) {
        proto.center_collision_mask = [
          ...(proto.center_collision_mask ?? []),
          NAUVIS_BUS_LAYER,
        ]
      }
      if ('adjacent_tile_collision_mask' in proto) {
        proto.adjacent_tile_collision_mask = [
          ...(proto.adjacent_tile_collision_mask ?? []),
          NAUVIS_BUS_LAYER,
        ]
      }
    }
  }
}
