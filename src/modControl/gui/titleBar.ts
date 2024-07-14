import { LocalisedString, FrameGuiElement } from 'factorio:runtime'
import { onGuiClicked } from '../events'

export function addTitleBar(
  frame: FrameGuiElement,
  playerIndex: number,
  caption: LocalisedString,
  onClose: () => void,
) {
  const flow = frame.add({
    type: 'flow',
  })
  flow.drag_target = frame
  flow.add({
    type: 'label',
    style: 'frame_title',
    caption,
    ignored_by_interaction: true,
  })
  const filler = flow.add({
    type: 'empty-widget',
    style: 'draggable_space',
    ignored_by_interaction: true,
  })
  filler.style.height = 24
  filler.style.horizontally_stretchable = true
  const name = `${frame.name}-title-bar`
  flow.add({
    type: 'sprite-button',
    name,
    style: 'frame_action_button',
    sprite: 'utility/close_white',
    hovered_sprite: 'utility/close_black',
    clicked_sprite: 'utility/close_black',
    tooltip: ['gui.close-instruction'],
    mouse_button_filter: ['left'],
  })
  return onGuiClicked(name, playerIndex, onClose)
}
