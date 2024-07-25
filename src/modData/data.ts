import { IconData } from 'factorio:prototype'
import { TilePrototype, TechnologyPrototype } from 'factorio:prototype'

const hazardConcreteLeft = data.raw.tile['hazard-concrete-left']
const dirt = data.raw.tile['dirt-1']
const tech = data.raw.technology['follower-robot-count-1']
if (!hazardConcreteLeft || !dirt || !tech || !tech.icons)
  throw new Error('Missing some prototypes')

export const NAUVIS_BUS_LAYER = 'layer-55'

const labSizeIcons: readonly IconData[] = [
  {
    ...tech.icons[0],
    icon: '__factorio-chip__/graphics/technology/lab-size.png',
  },
  tech.icons[1],
]

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
  {
    ...tech,
    name: 'factorio-chip-lab-size-1',
    effects: [],
    icons: labSizeIcons,
    prerequisites: [],
    unit: {
      count: 10,
      ingredients: [{ name: 'automation-science-pack', amount: 1 }],
      time: 15,
    },
  } satisfies TechnologyPrototype,
  {
    ...tech,
    name: 'factorio-chip-lab-size-2',
    effects: [],
    icons: labSizeIcons,
    prerequisites: ['factorio-chip-lab-size-1', 'logistic-science-pack'],
    unit: {
      count: 50,
      ingredients: [
        { name: 'automation-science-pack', amount: 1 },
        { name: 'logistic-science-pack', amount: 1 },
      ],
      time: 20,
    },
  } satisfies TechnologyPrototype,
  {
    ...tech,
    name: 'factorio-chip-lab-size-3',
    effects: [],
    icons: labSizeIcons,
    prerequisites: ['factorio-chip-lab-size-2'],
    unit: {
      count: 150,
      ingredients: [
        { name: 'automation-science-pack', amount: 1 },
        { name: 'logistic-science-pack', amount: 1 },
      ],
      time: 30,
    },
  } satisfies TechnologyPrototype,
  {
    ...tech,
    name: 'factorio-chip-lab-size-4',
    effects: [],
    icons: labSizeIcons,
    prerequisites: ['factorio-chip-lab-size-3', 'chemical-science-pack'],
    unit: {
      count: 200,
      ingredients: [
        { name: 'automation-science-pack', amount: 1 },
        { name: 'logistic-science-pack', amount: 1 },
        { name: 'chemical-science-pack', amount: 1 },
      ],
      time: 45,
    },
  } satisfies TechnologyPrototype,
  {
    ...tech,
    name: 'factorio-chip-lab-size-5',
    effects: [],
    icons: labSizeIcons,
    prerequisites: ['factorio-chip-lab-size-4'],
    unit: {
      count: 300,
      ingredients: [
        { name: 'automation-science-pack', amount: 1 },
        { name: 'logistic-science-pack', amount: 1 },
        { name: 'chemical-science-pack', amount: 1 },
      ],
      time: 45,
    },
  } satisfies TechnologyPrototype,
  {
    ...tech,
    name: 'factorio-chip-lab-size-6',
    effects: [],
    icons: labSizeIcons,
    prerequisites: ['factorio-chip-lab-size-5', 'production-science-pack'],
    unit: {
      count: 350,
      ingredients: [
        { name: 'automation-science-pack', amount: 1 },
        { name: 'logistic-science-pack', amount: 1 },
        { name: 'chemical-science-pack', amount: 1 },
        { name: 'production-science-pack', amount: 1 },
      ],
      time: 45,
    },
  } satisfies TechnologyPrototype,
  {
    ...tech,
    name: 'factorio-chip-lab-size-7',
    effects: [],
    icons: labSizeIcons,
    prerequisites: ['factorio-chip-lab-size-6', 'utility-science-pack'],
    unit: {
      count: 500,
      ingredients: [
        { name: 'automation-science-pack', amount: 1 },
        { name: 'logistic-science-pack', amount: 1 },
        { name: 'chemical-science-pack', amount: 1 },
        { name: 'production-science-pack', amount: 1 },
        { name: 'utility-science-pack', amount: 1 },
      ],
      time: 45,
    },
  } satisfies TechnologyPrototype,
] as const
