import { BaseGuiElement, LocalisedString } from 'factorio:runtime'
import { Info } from './info'
import { getItemsAndIndex } from './items'

const FLOW_NAME = 'factorio-chip-ui-name-drop-down-flow'
const LABEL_NAME = 'factorio-chip-ui-name-drop-down-label'
const DROP_DOWN_NAME = 'factorio-chip-ui-name-drop-down-drop-down'

export function addNameDropDown(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    name: FLOW_NAME,
    direction: 'horizontal',
    style: 'player_input_horizontal_flow',
    visible: info.valid,
  })
  flow.style.horizontally_stretchable = true
  const caption: LocalisedString = ['', ['controls.factorio-chip-chip'], ': ']
  flow.add({
    type: 'label',
    name: LABEL_NAME,
    caption,
  })
  const { items, selected_index } = getItemsAndIndex(info)
  const dropDown = flow.add({
    type: 'drop-down',
    name: DROP_DOWN_NAME,
    items,
    selected_index,
  })
  dropDown.style.horizontally_stretchable = true
  return { flow, dropDown }
}
