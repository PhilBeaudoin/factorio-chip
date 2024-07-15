import { stgs } from '../modSettings'
import { debug } from './debug'
import { state } from './state'
import { onPlayerCreated, onChunkGenerated, onSurfaceCreated } from './events'
import { gui } from './gui'
import { clearSurface, generateChunk } from './map'
import { registerEntitiesWatchLab } from './map/lab'
import { registerEntitiesWatchNauvis } from './map/nauvis'

let initialized = false

export function init() {
  if (initialized || !isEnabled()) return
  initialized = true

  remote.call('freeplay', 'set_skip_intro', true)
  remote.call('freeplay', 'set_disable_crashsite', true)
  state.init()
  game.create_surface('lab')

  onPlayerCreated((e) => {
    const player = game.players[e.player_index]
    gui.init(player)
    const inventory = player.get_main_inventory()
    inventory?.insert({ name: 'iron-plate', count: 64 })
    inventory?.insert({ name: 'copper-plate', count: 64 })
    inventory?.insert({ name: 'stone', count: 64 })
    inventory?.insert({ name: 'coal', count: 64 })
    inventory?.insert({ name: 'wood', count: 64 })
    inventory?.insert({ name: 'burner-mining-drill', count: 10 })
    inventory?.insert({ name: 'stone-furnace', count: 10 })
    inventory?.insert({ name: 'offshore-pump', count: 1 })
    inventory?.insert({ name: 'transport-belt', count: 500 })
  })
  onSurfaceCreated((e) => clearSurface(game.surfaces[e.surface_index]))
  onChunkGenerated((e) => generateChunk(e))

  registerEntitiesWatchNauvis()
  registerEntitiesWatchLab()
}

function isEnabled() {
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
