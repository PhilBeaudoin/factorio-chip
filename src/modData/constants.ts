import { TilePrototype } from 'factorio:prototype'

const hazardConcreteLeft = data.raw.tile['hazard-concrete-left']
if (!hazardConcreteLeft)
  throw new Error('Missing prototype: hazard-concrete-left')

export const PROTOTYPES = [
  {
    ...hazardConcreteLeft,
    name: 'lab-bus',
    collision_mask: [...hazardConcreteLeft.collision_mask, 'object-layer'],
  } satisfies TilePrototype,
] as const
