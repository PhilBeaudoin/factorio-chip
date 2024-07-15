import { LocalisedString } from 'factorio:runtime'
import { MapPosition } from 'factorio:runtime'

export const NONE_ITEM: LocalisedString = [
  'controls.factorio-chip-none',
] as const

export interface Info {
  valid: boolean
  chunkPosition?: MapPosition
  chipIndex?: number | undefined
  chipNames?: readonly LocalisedString[]
  chipName?: string
}
