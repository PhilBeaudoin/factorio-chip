import { stgs } from '../modSettings'
import { debug } from './debug'

export function isModEnabled() {
  if (!stgs.modEnabled()) {
    debug(`factorio-chip mod disabled`)
    return false
  }
  if (script.level.level_name !== 'freeplay') {
    debug(`factorio-chip mod only works in freeplay mode`)
    return false
  }
  debug(`factorio-chip mod enabled`)
  return true
}
