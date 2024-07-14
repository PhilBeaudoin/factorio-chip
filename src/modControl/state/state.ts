import { ChipType } from '../map'

declare const global: {
  num_chips: number
  chip_names: (string | undefined)[]
  chip_types: (ChipType | undefined)[]
}

let initialized = false

export function init() {
  if (initialized) return
  initialized = true

  global.num_chips = 8
  global.chip_names = []
  global.chip_types = []
}

export const getNumChips = () => global.num_chips
export const setNumChips = (n: number) => (global.num_chips = n)

export const getChipName = (i: number): string => {
  if (i < 0) return ''
  const res = global.chip_names[i]
  if (res !== undefined) return res
  return `Chip ${i + 1}`
}
export const setChipName = (i: number, name?: string) => {
  if (name === '' || name === undefined) delete global.chip_names[i]
  else if (i >= 0 && i < global.num_chips) global.chip_names[i] = name
}

export const getChipType = (i: number | undefined): ChipType => {
  if (i === undefined || i < 0) return 'empty'
  return global.chip_types[i] ?? 'empty'
}
export const setChipType = (i: number, type?: ChipType) => {
  if (type === undefined || type === 'empty') delete global.chip_types[i]
  else if (i >= 0 && i < global.num_chips) global.chip_types[i] = type
}
