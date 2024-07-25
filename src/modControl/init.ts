import { stgs } from '../modSettings'
import { state } from './state'
import { onPlayerCreated, onChunkGenerated, onSurfaceCreated } from './events'
import { gui } from './gui'
import { clearSurface, generateChunk, generateLabChip } from './map'
import { isModEnabled } from './utils'
import { onResearchFinished } from './events'
import { LuaTechnology } from 'factorio:runtime'

const EXTRA_CHIP_PER_RESEARCH = 2

const DEBUG = true

// Using a global variable not in global only for debugging purposes
let initialized = false

export function init() {
  if (initialized) throw new Error('init.ts: Already initialized')
  if (!isModEnabled()) return
  initialized = true

  remote.call('freeplay', 'set_skip_intro', true)
  remote.call('freeplay', 'set_disable_crashsite', true)
  state.init()
  game.create_surface('lab')

  for (const [playerIndex] of game.players) initPlayer(playerIndex)
}

function initPlayer(playerIndex: number) {
  const player = game.players[playerIndex]
  const force = player.force
  gui.init(player)
  const inv = player.get_main_inventory()
  const armorInv = player.get_inventory(defines.inventory.character_armor)
  if (!inv || !armorInv) return

  inv.clear()
  inv.insert({ name: 'burner-mining-drill', count: DEBUG ? 50 : 8 })
  inv.insert({ name: 'stone-furnace', count: DEBUG ? 50 : 8 })
  inv.insert({ name: 'wooden-chest', count: DEBUG ? 50 : 8 })
  inv.insert({ name: 'stone', count: 100 })
  inv.insert({ name: 'coal', count: 100 })
  inv.insert({ name: 'wood', count: 200 })

  if (DEBUG) {
    state.setNumChips(10)
    force.technologies['automation'].researched = true
    force.technologies['logistics'].researched = true
    inv.insert({ name: 'iron-plate', count: 100 })
    inv.insert({ name: 'copper-plate', count: 100 })
    inv.insert({ name: 'iron-gear-wheel', count: 100 })
    inv.insert({ name: 'offshore-pump', count: 10 })
    inv.insert({ name: 'pipe', count: 100 })
    inv.insert({ name: 'pipe-to-ground', count: 100 })
    inv.insert({ name: 'boiler', count: 20 })
    inv.insert({ name: 'steam-engine', count: 40 })
    inv.insert({ name: 'small-electric-pole', count: 200 })
    inv.insert({ name: 'electric-mining-drill', count: 50 })
    inv.insert({ name: 'transport-belt', count: 500 })
    inv.insert({ name: 'splitter', count: 50 })
    inv.insert({ name: 'underground-belt', count: 50 })
    inv.insert({ name: 'inserter', count: 100 })
    inv.insert({ name: 'long-handed-inserter', count: 100 })
    inv.insert({ name: 'assembling-machine-1', count: 100 })
  }

  if (stgs.startWithRobots()) {
    for (let i = 1; i < 6; ++i)
      force.technologies[`worker-robots-speed-${i}`].researched = true
    inv.insert({ name: 'construction-robot', count: 10 })
    armorInv.insert({ name: 'modular-armor', count: 1 })
    const [armor] = armorInv.find_item_stack('modular-armor')
    const grid = armor?.grid
    if (grid) {
      grid.put({ name: 'exoskeleton-equipment' })
      const roboport = grid.put({ name: 'personal-roboport-mk2-equipment' })
      roboport && (roboport.energy = roboport.max_energy)
      const battery = grid.put({ name: 'battery-equipment' })
      battery && (battery.energy = battery.max_energy)
      for (let i = 0; i < 11; ++i) grid.put({ name: 'solar-panel-equipment' })
    }
  }
}

function checkResearch(research: LuaTechnology) {
  if (research.name.startsWith('factorio-chip-lab-size-')) {
    const numChips = state.getNumChips()
    const newNumChips = numChips + EXTRA_CHIP_PER_RESEARCH
    state.setNumChips(newNumChips)
    for (let chip = numChips; chip < newNumChips; ++chip) generateLabChip(chip)
  }
}

////// EVENTS //////

onSurfaceCreated((e) => clearSurface(game.surfaces[e.surface_index]))
onChunkGenerated((e) => generateChunk(e.surface.name, e.area))
onPlayerCreated((e) => initPlayer(e.player_index))
onResearchFinished((e) => checkResearch(e.research))
