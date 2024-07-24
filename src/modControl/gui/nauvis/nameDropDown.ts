import { BaseGuiElement, LocalisedString } from 'factorio:runtime'
import { Info } from './info'
import { getItemsAndIndex } from './items'
import { findGui } from '../util'

const FLOW = 'factorio-chip-ui-name-drop-down-flow'
const LABEL = 'factorio-chip-ui-name-drop-down-label'
const DROP_DOWN = 'factorio-chip-ui-name-drop-down-drop-down'

export const CHIP_NAME_DROP_DOWN = DROP_DOWN

export function addNameDropDown(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    name: FLOW,
    direction: 'horizontal',
    style: 'player_input_horizontal_flow',
    visible: info.valid,
  })
  flow.style.horizontally_stretchable = true
  const caption: LocalisedString = ['', ['controls.factorio-chip-chip'], ': ']
  flow.add({
    type: 'label',
    name: LABEL,
    caption,
  })
  const { items, selected_index } = getItemsAndIndex(info)
  const dropDown = flow.add({
    type: 'drop-down',
    name: DROP_DOWN,
    items,
    selected_index,
  })
  dropDown.style.horizontally_stretchable = true
}

export function updateNameDropDown(playerIndex: number, info: Info) {
  const flow = findGui(FLOW, 'flow', playerIndex)
  flow && (flow.visible = info.valid)
  const dropDown = findGui(DROP_DOWN, 'drop-down', playerIndex)
  if (!info.valid || !dropDown) return
  const { items, selected_index } = getItemsAndIndex(info)
  dropDown.items = items as string[]
  dropDown.selected_index = selected_index
}

// selected_index is 1 indexed
// -1: NONE_ITEM
//  0: first chip index
export function getDropDownChipIndex(playerIndex: number) {
  const dropDown = findGui(DROP_DOWN, 'drop-down', playerIndex)
  return (dropDown?.selected_index ?? 1) - 2
}
