import { MapPosition } from 'factorio:prototype'
import { onToggleLab } from '../gui'

let initialized = false

const position: { [surface: string]: MapPosition } = {
  nauvis: { x: 0, y: 0 },
  lab: { x: 0.5, y: 0.5 },
}

export function init() {
  if (initialized) return
  initialized = true
  onToggleLab((e) => {
    const player = game.players[e.player_index]
    const surface = player.surface.name
    if (!surface) return
    position[surface] = player.position
    const otherSurface = surface === 'nauvis' ? 'lab' : 'nauvis'
    player.opened = undefined
    player.teleport(position[otherSurface], otherSurface)
  })
}
