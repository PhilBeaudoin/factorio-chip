import { BaseGuiElement, MapPosition } from 'factorio:runtime'
import { onGuiClicked, onPlayerChangedSurface } from '../events'
import { ensureCharactersCanMove } from '../map/entities'

const NAME = 'factorio-chip-ui-toggle-lab'

export function addToggleLabButton(
  parent: BaseGuiElement,
  playerIndex: number,
) {
  const button = parent.add({
    type: 'button',
    name: NAME,
    caption: ['controls.factorio-chip-toggle-lab'],
    mouse_button_filter: ['left'],
    style: 'button',
  })
  button.style.horizontally_stretchable = true

  const savedPos: { [surface: string]: MapPosition } = {
    nauvis: { x: 0, y: 0 },
    lab: { x: 0.5, y: 0.5 },
  }
  onGuiClicked(button.name, playerIndex, () => {
    const player = game.players[playerIndex]
    const surface = player.surface.name
    if (!surface) return
    savedPos[surface] = player.position
    const otherSurface = surface === 'nauvis' ? 'lab' : 'nauvis'
    player.opened = undefined
    player.teleport(savedPos[otherSurface], otherSurface)
    ensureCharactersCanMove(game.surfaces[otherSurface])
  })
  onPlayerChangedSurface(playerIndex, (e) => {
    const player = game.players[e.player_index]
    const name = player.surface.name
    const otherName = name === 'nauvis' ? 'lab' : 'nauvis'
    button.caption = [`controls.factorio-chip-toggle-${otherName}`]
  })
}
