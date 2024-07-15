import { MapPosition } from 'factorio:runtime'
import { stgs } from '../../modSettings'
import { ChipType } from '../map'

declare const global: {
  chip_names: string[]
  chip_types: ChipType[]
  chip_indexes: { [pos: string]: number }
}

let initialized = false

export function init() {
  if (initialized) return
  initialized = true

  global.chip_names = []
  setNumChips(stgs.initChipCount())
  global.chip_types = []
  global.chip_indexes = {}
}

export const getNumChips = () => global.chip_names.length
export const setNumChips = (n: number) => {
  const length = global.chip_names.length
  if (n <= length) global.chip_names.length = Math.max(0, n)
  else {
    global.chip_names.length = n
    for (let i = length; i < n; i++) global.chip_names[i] = `Chip ${i + 1}`
  }
}

export const getChipNames = (): readonly string[] => global.chip_names
export const getChipName = (i: number): string => {
  if (i < 0 || i >= global.chip_names.length) return ''
  return global.chip_names[i]
}
export const setChipName = (i: number, name?: string) => {
  if (name === '' || name === undefined) global.chip_names[i] = `Chip ${i + 1}`
  else if (i >= 0 && i < global.chip_names.length) global.chip_names[i] = name
}

export const getChipType = (i: number | undefined): ChipType => {
  if (i === undefined || i < 0) return 'empty'
  return global.chip_types[i] ?? 'empty'
}
export const setChipType = (i: number, type?: ChipType) => {
  if (type === undefined || type === 'empty') delete global.chip_types[i]
  else if (i >= 0 && i < global.chip_names.length) global.chip_types[i] = type
}

export const getChipAtChunk = (
  chunkPosition: MapPosition,
): number | undefined => {
  const pos = `${chunkPosition.x},${chunkPosition.y}`
  return global.chip_indexes[pos]
}

export const setChipAtChunk = (
  chunkPosition: MapPosition,
  chipIndex: number | undefined,
) => {
  const pos = `${chunkPosition.x},${chunkPosition.y}`
  if (chipIndex === undefined) delete global.chip_indexes[pos]
  else global.chip_indexes[pos] = chipIndex
}

export const getChunksForChipIndex = (chipIndex: number): MapPosition[] => {
  const pos = []
  for (const [p, i] of Object.entries(global.chip_indexes)) {
    if (i === chipIndex) {
      const [x, y] = p.split(',')
      pos.push({ x: Number(x), y: Number(y) })
    }
  }
  return pos
}
