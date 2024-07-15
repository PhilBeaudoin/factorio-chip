import {
  IntSettingDefinition,
  BoolSettingDefinition,
  BaseSettingDefinition,
} from 'factorio:settings'
import { SETTINGS } from './constants'
import { PlayerIdentification } from 'factorio:runtime'

export function init() {
  data.extend(Object.values(SETTINGS))
}

function getValue(def: BaseSettingDefinition, pid?: PlayerIdentification) {
  if (def.setting_type === 'startup') return settings.startup[def.name].value
  else if (def.setting_type === 'runtime-global')
    return settings.global[def.name].value
  else
    return pid !== undefined
      ? settings.get_player_settings(pid)[def.name].value
      : undefined
}

function asNumber(
  def: IntSettingDefinition,
  pid?: PlayerIdentification,
): number {
  const val = getValue(def, pid)
  return typeof val === 'number' ? val : def.default_value
}

function asBool(
  def: BoolSettingDefinition,
  pid?: PlayerIdentification,
): boolean {
  const val = getValue(def, pid)
  return typeof val === 'boolean' ? val : def.default_value
}

export function modEnabled(): boolean {
  return asBool(SETTINGS.modEnabled)
}

export function initChipCount(): number {
  return asNumber(SETTINGS.initChipCount)
}
