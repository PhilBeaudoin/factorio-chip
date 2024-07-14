import { IntSettingDefinition, BoolSettingDefinition } from 'factorio:settings'
import { SETTINGS } from './constants'

export function init() {
  data.extend(Object.values(SETTINGS))
}

function asNumber(def: IntSettingDefinition): number {
  const val = settings.global[def.name].value
  return typeof val === 'number' ? val : def.default_value
}

function asBool(def: BoolSettingDefinition): boolean {
  const val = settings.global[def.name].value
  return typeof val === 'boolean' ? val : def.default_value
}

export function modEnabled(): boolean {
  return asBool(SETTINGS.modEnabled)
}

export function chipWidth(): number {
  return asNumber(SETTINGS.chipWidth)
}

export function chipHeight(): number {
  return asNumber(SETTINGS.chipHeight)
}

export function busWidth(): number {
  return asNumber(SETTINGS.busWidth)
}
