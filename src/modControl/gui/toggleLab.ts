import { BaseGuiElement, OnGuiClickEvent } from 'factorio:runtime'
import {
  addToRegistry,
  callAll,
  createRegistry,
  onGuiClicked,
  onPlayerChangedSurface,
} from '../events'

const NAME = 'factorio-chip-ui-toggle-lab'
const REGISTRY = createRegistry<OnGuiClickEvent>()

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
  onGuiClicked(NAME, playerIndex, (e) => callAll(REGISTRY, e))
  onPlayerChangedSurface(playerIndex, (e) => {
    const player = game.players[e.player_index]
    const name = player.surface.name
    const otherName = name === 'nauvis' ? 'lab' : 'nauvis'
    button.caption = [`controls.factorio-chip-toggle-${otherName}`]
  })
}

export function onToggleLab(f: (e: OnGuiClickEvent) => void) {
  return addToRegistry(REGISTRY, f)
}
