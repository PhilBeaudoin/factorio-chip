import { BaseGuiElement, LocalisedString } from 'factorio:runtime'
import { Info } from './info'
import { CHIP_TYPES } from '../../map'

const FLOW_NAME = 'factorio-chip-ui-type-drop-down-flow'
const LABEL_NAME = 'factorio-chip-ui-type-drop-down-label'
const DROP_DOWN_NAME = 'factorio-chip-ui-type-drop-down-drop-down'

export function addTypeDropDown(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    name: FLOW_NAME,
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
    name: LABEL_NAME,
    caption,
  })
  const chipType = info.chipType || 'empty'
  const dropDown = flow.add({
    type: 'drop-down',
    name: DROP_DOWN_NAME,
    items: CHIP_TYPES as any,
    selected_index: CHIP_TYPES.indexOf(chipType) + 1,
  })
  dropDown.style.horizontally_stretchable = true
  return { flow, dropDown }
}
