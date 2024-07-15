import { ChipType } from '../../map'

export interface Info {
  valid: boolean
  chipIndex?: number | undefined
  chipName?: string
  chipType?: ChipType
  editing?: boolean
}
