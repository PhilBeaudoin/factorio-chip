import { TilePrototype } from 'factorio:prototype'

const hazardConcreteLeft = data.raw.tile['hazard-concrete-left']
const dirt = data.raw.tile['dirt-1']
if (!hazardConcreteLeft || !dirt) throw new Error('Missing some prototypes')

export const NAUVIS_BUS_LAYER = 'layer-55'

export const PROTOTYPES = [
  {
    ...hazardConcreteLeft,
    name: 'factorio-chip-lab-bus',
    collision_mask: [...hazardConcreteLeft.collision_mask, 'object-layer'],
  } satisfies TilePrototype,
  {
    ...dirt,
    name: 'factorio-chip-nauvis-bus',
    collision_mask: [...dirt.collision_mask, NAUVIS_BUS_LAYER],
  } satisfies TilePrototype,
] as const
