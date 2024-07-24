import { BaseGuiElement, LocalisedString } from 'factorio:runtime'
import { Info } from './info'
import { CHIP_TYPES } from '../../map'
import { findGui } from '../util'

const FLOW = 'factorio-chip-ui-type-drop-down-flow'
const LABEL = 'factorio-chip-ui-type-drop-down-label'
const DROP_DOWN = 'factorio-chip-ui-type-drop-down-drop-down'

export const CHIP_TYPE_DROP_DOWN = DROP_DOWN

export function addTypeDropDown(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    name: FLOW,
    direction: 'horizontal',
    style: 'player_input_horizontal_flow',
    visible: info.valid,
  })
  flow.style.horizontally_stretchable = true
  const caption: LocalisedString = [
    '',
    ['controls.factorio-chip-chip-type'],
    ': ',
  ]
  flow.add({
    type: 'label',
    name: LABEL,
    caption,
  })
  const chipType = info.chipType || 'empty'
  const dropDown = flow.add({
    type: 'drop-down',
    name: DROP_DOWN,
    items: CHIP_TYPES as any,
    selected_index: CHIP_TYPES.indexOf(chipType) + 1,
  })
  dropDown.style.horizontally_stretchable = true
}

export function updateTypeDropDown(playerIndex: number, info: Info) {
  const flow = findGui(FLOW, 'flow', playerIndex)
  flow && (flow.visible = info.valid)
  const dropDown = findGui(DROP_DOWN, 'drop-down', playerIndex)
  if (!info.valid || !dropDown) return
  const chipType = info.chipType || 'empty'
  dropDown.selected_index = CHIP_TYPES.indexOf(chipType) + 1
}

export function getDropDownChipType(playerIndex: number) {
  const dropDown = findGui(DROP_DOWN, 'drop-down', playerIndex)
  return CHIP_TYPES[(dropDown?.selected_index ?? 1) - 1]
}
