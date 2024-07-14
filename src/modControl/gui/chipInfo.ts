import { BaseGuiElement, LocalisedString } from 'factorio:runtime'
import {
  onGuiClicked,
  onGuiConfirmed,
  onGuiSelectionStateChanged,
  onPlayerChangedPosition,
  onPlayerChangedSurface,
} from '../events'
import { state } from '../state'
import {
  CHIP_TYPES,
  ChipType,
  positionToChipIndex,
  resetLabChip,
  writeChipName,
} from '../map'

const FLOW_NAME = 'factorio-chip-ui-chip-name-hflow'
const LABEL_NAME = 'factorio-chip-ui-chip-name'
const RENAME_NAME = 'factorio-chip-ui-chip-rename'

const UNKNOWN_CHIP: LocalisedString = [
  '',
  ['controls.factorio-chip-chip'],
  ': ',
  ['controls.factorio-chip-unknown'],
]

interface Info {
  chipIndex?: number | undefined
  caption?: LocalisedString
  chipName?: string
  chipType: ChipType
  editable: boolean
  editing: boolean
}

export function addChipInfo(parent: BaseGuiElement, playerIndex: number) {
  const info = updateInfo(playerIndex)
  const { label, textField, renameButton } = addChipName(parent, info)
  const { label: dropDownLabel, dropDown } = addDropDown(parent, info)

  const update = () => {
    updateInfo(playerIndex, info)
    label.visible = !info.editing
    textField.visible = info.editing
    renameButton.visible = info.editable
    dropDownLabel.visible = !info.editable
    dropDown.visible = info.editable

    label.caption = info.caption
    textField.text = info.chipName || ''
    dropDown.selected_index = CHIP_TYPES.indexOf(info.chipType) + 1
  }
  const commitChipNameAndUpdate = () => {
    if (info.editable && info.editing) {
      info.editing = false
      if (info.chipIndex !== undefined) {
        const name = textField.text.trim()
        if (name !== state.getChipName(info.chipIndex)) {
          state.setChipName(info.chipIndex, textField.text.trim())
          writeChipName(info.chipIndex)
        }
      }
    }
    update()
  }
  const updateChipType = () => {
    if (info.chipIndex !== undefined) {
      const type = CHIP_TYPES[dropDown.selected_index - 1]
      state.setChipType(info.chipIndex, type)
      resetLabChip(info.chipIndex, playerIndex)
    }
    commitChipNameAndUpdate()
  }
  onGuiClicked(renameButton.name, playerIndex, () => {
    if (info.editing) commitChipNameAndUpdate()
    else {
      info.editing = true
      update()
      textField.focus()
    }
  })
  onGuiSelectionStateChanged(dropDown.name, playerIndex, updateChipType)
  onGuiConfirmed(textField.name, playerIndex, commitChipNameAndUpdate)
  onPlayerChangedSurface(playerIndex, commitChipNameAndUpdate)
  onPlayerChangedPosition(playerIndex, commitChipNameAndUpdate)
}

function addChipName(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    name: FLOW_NAME,
    direction: 'horizontal',
    style: 'player_input_horizontal_flow',
  })
  flow.style.horizontally_stretchable = true
  const label = addLabel(flow, info)
  const textField = addTextField(flow, info)
  const filler = flow.add({
    type: 'empty-widget',
    ignored_by_interaction: true,
  })
  filler.style.horizontally_stretchable = true
  const renameButton = addRenameButton(flow, info)

  return { label, textField, renameButton }
}

export function addLabel(parent: BaseGuiElement, info: Info) {
  return parent.add({
    type: 'label',
    name: LABEL_NAME,
    caption: info.caption,
    visible: !info.editable,
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

function addRenameButton(parent: BaseGuiElement, info: Info) {
  return parent.add({
    type: 'sprite-button',
    name: RENAME_NAME,
    sprite: 'utility/rename_icon_normal',
    style: 'tool_button',
    visible: info.editable,
  })
}

function addDropDown(parent: BaseGuiElement, info: Info) {
  const flow = parent.add({
    type: 'flow',
    direction: 'horizontal',
    style: 'player_input_horizontal_flow',
  })
  flow.style.horizontally_stretchable = true
  const caption: LocalisedString = [
    '',
    ['controls.factorio-chip-chip-type'],
    ': ',
  ]
  flow.add({
    type: 'label',
    caption,
  })
  const label = flow.add({
    type: 'label',
    caption: info.chipType,
    visible: !info.editable,
  })
  const dropDown = flow.add({
    type: 'drop-down',
    items: CHIP_TYPES,
    selected_index: CHIP_TYPES.indexOf(info.chipType) + 1,
    visible: info.editable,
  })
  dropDown.style.horizontally_stretchable = true
  return { label, dropDown }
}

function updateInfo(playerIndex: number, info?: Info): Info {
  if (!info) info = { chipType: 'empty', editable: false, editing: false }
  const player = game.players[playerIndex]
  const surfaceName = player?.surface.name

  const ni: Info = { chipType: 'empty', editable: false, editing: false }

  if (surfaceName === 'nauvis') {
    ni.caption = UNKNOWN_CHIP
  } else if (surfaceName === 'lab') {
    const chipIndex = positionToChipIndex(player.position)
    const valid = chipIndex !== undefined
    ni.chipIndex = chipIndex
    ni.chipName = valid ? state.getChipName(chipIndex) : undefined
    ni.caption = valid ? ni.chipName : UNKNOWN_CHIP
    ni.chipType = state.getChipType(chipIndex)
    ni.editable = ni.chipIndex !== undefined
    ni.editing = info.editing
  }

  const hasChanged =
    info.chipIndex !== ni.chipIndex ||
    info.caption !== ni.caption ||
    info.chipName !== ni.chipName ||
    info.chipType !== ni.chipType ||
    info.editable !== ni.editable

  info.chipIndex = ni.chipIndex
  info.caption = ni.caption
  info.chipName = ni.chipName
  info.chipType = ni.chipType
  info.editable = ni.editable
  info.editing = hasChanged ? false : ni.editing

  return info
}
