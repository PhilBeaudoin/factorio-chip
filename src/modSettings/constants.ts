import { BoolSettingDefinition, IntSettingDefinition } from 'factorio:settings'

export const SETTINGS = {
  modEnabled: {
    type: 'bool-setting',
    name: 'factorio-chip-enable-mod',
    setting_type: 'startup',
    default_value: true,
  } satisfies BoolSettingDefinition,
  initChipCount: {
    type: 'int-setting',
    name: 'factorio-chip-init-chip-count',
    setting_type: 'startup',
    default_value: 2,
    minimum_value: 1,
    maximum_value: 10,
  } satisfies IntSettingDefinition,
  startWithRobots: {
    type: 'bool-setting',
    name: 'factorio-chip-start-with-robots',
    setting_type: 'runtime-global',
    default_value: true,
  } satisfies BoolSettingDefinition,
} as const
