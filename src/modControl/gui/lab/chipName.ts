import { BaseGuiElement } from 'factorio:runtime'
import { Info } from './info'
import { findGui } from '../util'

const FLOW = 'factorio-chip-ui-chip-name-flow'
const TEXT_FIELD = 'factorio-chip-ui-chip-name-text-field'
const LABEL = 'factorio-chip-ui-chip-name-label'
const RENAME = 'factorio-chip-ui-chip-name-rename'

export const CHIP_TEXT_FIELD = TEXT_FIELD
export const CHIP_RENAME_BUTTON = RENAME

export function addChipName(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    name: FLOW,
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
    name: LABEL,
    caption: info.chipName || '',
  })
}

function addTextField(parent: BaseGuiElement, info: Info) {
  return parent.add({
    type: 'textfield',
    name: TEXT_FIELD,
    text: info.chipName || '',
    visible: info.editing,
    lose_focus_on_confirm: true,
  })
}

function addRenameButton(parent: BaseGuiElement) {
  return parent.add({
    type: 'sprite-button',
    name: RENAME,
    sprite: 'utility/rename_icon_normal',
    style: 'tool_button',
  })
}

export function updateChipName(playerIndex: number, info: Info) {
  const flow = findGui(FLOW, 'flow', playerIndex)
  flow && (flow.visible = info.valid)
  const label = findGui(LABEL, 'label', playerIndex)
  const textField = findGui(TEXT_FIELD, 'textfield', playerIndex)
  if (!info.valid || !label || !textField) return

  label.visible = !info.editing
  label.caption = info.chipName || ''

  textField.visible = !!info.editing
  textField.text = info.chipName || ''
}

export function focusTextField(playerIndex: number) {
  const textField = findGui(TEXT_FIELD, 'textfield', playerIndex)
  if (!textField) return
  textField.focus()
  textField.select_all()
}

export function getTextFieldText(playerIndex: number) {
  const textField = findGui(TEXT_FIELD, 'textfield', playerIndex)
  return textField ? textField.text : ''
}
