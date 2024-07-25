import { BaseGuiElement, MapPosition } from 'factorio:runtime'
import { onGuiClicked, onPlayerChangedSurface } from '../events'
import { ensureCharactersCanMove } from '../map/entities'
import { state } from '../state'
import { findGui } from './util'

const NAME = 'factorio-chip-ui-toggle-lab'

declare module '../state/state' {
  interface PlayerGlobal {
    savedPos?: Record<string, MapPosition>
  }
}

export function addToggleLabButton(
  parent: BaseGuiElement,
  _playerIndex: number,
) {
  const button = parent.add({
    type: 'button',
    name: NAME,
    caption: ['controls.factorio-chip-toggle-lab'],
    mouse_button_filter: ['left'],
    style: 'button',
  })
  button.style.horizontally_stretchable = true
}

const getSavedPos = (playerIndex: number, surface: string) => {
  const playerGlobal = state.getPlayerGlobal(playerIndex)
  return playerGlobal.savedPos?.[surface] ?? { x: 0, y: 0 }
}
const setSavedPos = (
  playerIndex: number,
  surface: string,
  pos: MapPosition,
) => {
  const playerGlobal = state.getPlayerGlobal(playerIndex)
  playerGlobal.savedPos = playerGlobal.savedPos || {}
  playerGlobal.savedPos[surface] = pos
}

////// EVENTS //////

onGuiClicked(NAME, (e) => {
  const player = game.players[e.player_index]
  const surface = player.surface.name
  if (!surface) return
  setSavedPos(e.player_index, surface, player.position)
  const otherSurface = surface === 'nauvis' ? 'lab' : 'nauvis'
  player.opened = undefined
  player.teleport(getSavedPos(e.player_index, otherSurface), otherSurface)
  ensureCharactersCanMove(game.surfaces[otherSurface])
})

onPlayerChangedSurface((e) => {
  const button = findGui(NAME, 'button', e.player_index)
  if (!button) return
  const player = game.players[e.player_index]
  const name = player.surface.name
  const otherName = name === 'nauvis' ? 'lab' : 'nauvis'
  button.caption = [`controls.factorio-chip-toggle-${otherName}`]
})
