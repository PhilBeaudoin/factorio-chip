import { BoolSettingDefinition, IntSettingDefinition } from 'factorio:settings'

export const PAD_SPACING = 3
const MAX_BUS_WIDTH = 8

export const SETTINGS = {
  modEnabled: {
    type: 'bool-setting',
    name: 'factorio-chip-enable-mod',
    setting_type: 'runtime-global',
    default_value: true,
  } satisfies BoolSettingDefinition,
  chipWidth: {
    type: 'int-setting',
    name: 'factorio-chip-chip-width',
    setting_type: 'runtime-global',
    default_value: 12,
    minimum_value: 12,
    maximum_value: 32 - MAX_BUS_WIDTH - 6,
  } satisfies IntSettingDefinition,
  chipHeight: {
    type: 'int-setting',
    name: 'factorio-chip-chip-height',
    setting_type: 'runtime-global',
    default_value: 9,
    minimum_value: 9,
    maximum_value: 32 - MAX_BUS_WIDTH - 6,
  } satisfies IntSettingDefinition,
  busWidth: {
    type: 'int-setting',
    name: 'factorio-chip-bus-width',
    setting_type: 'runtime-global',
    default_value: 4,
    minimum_value: 2,
    maximum_value: MAX_BUS_WIDTH,
  } satisfies IntSettingDefinition,
} as const
