import { BaseGuiElement } from 'factorio:runtime'
import { Info } from './info'

const FLOW_NAME = 'factorio-chip-ui-chip-name-flow'
const LABEL_NAME = 'factorio-chip-ui-chip-name-label'
const RENAME_NAME = 'factorio-chip-ui-chip-name-rename'

export function addChipName(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    name: FLOW_NAME,
    direction: 'horizontal',
    style: 'player_input_horizontal_flow',
    visible: info.valid,
  })
  flow.style.horizontally_stretchable = true
  const label = addLabel(flow, info)
  const textField = addTextField(flow, info)
  const filler = flow.add({
    type: 'empty-widget',
    ignored_by_interaction: true,
  })
  filler.style.horizontally_stretchable = true
  const renameButton = addRenameButton(flow)

  return { flow, label, textField, renameButton }
}

function addLabel(parent: BaseGuiElement, info: Info) {
  return parent.add({
    type: 'label',
    name: LABEL_NAME,
    caption: info.chipName || '',
  })
}

function addTextField(parent: BaseGuiElement, info: Info) {
  return parent.add({
    type: 'textfield',
    text: info.chipName || '',
    visible: info.editing,
    lose_focus_on_confirm: true,
  })
}

function addRenameButton(parent: BaseGuiElement) {
  return parent.add({
    type: 'sprite-button',
    name: RENAME_NAME,
    sprite: 'utility/rename_icon_normal',
    style: 'tool_button',
  })
}
