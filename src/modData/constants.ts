import { TilePrototype } from 'factorio:prototype'

const hazardConcreteLeft = data.raw.tile['hazard-concrete-left']
const dirt = data.raw.tile['dirt-1']
if (!hazardConcreteLeft || !dirt) throw new Error('Missing some prototypes')

export const PROTOTYPES = [
  {
    ...hazardConcreteLeft,
    name: 'lab-bus',
    collision_mask: [...hazardConcreteLeft.collision_mask, 'object-layer'],
  } satisfies TilePrototype,
  {
    ...dirt,
    name: 'nauvis-bus',
  } satisfies TilePrototype,
] as const
