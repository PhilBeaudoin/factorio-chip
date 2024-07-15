import { BaseGuiElement } from 'factorio:runtime'
import {
  onGuiClicked,
  onGuiConfirmed,
  onGuiSelectionStateChanged,
  onPlayerChangedPosition,
  onPlayerChangedSurface,
} from '../../events'
import { state } from '../../state'
import {
  CHIP_TYPES,
  positionToChipIndex,
  resetAllNauvisChipsForIndex,
  resetLabChip,
  writeChipName,
} from '../../map'
import { Info } from './info'
import { addChipName } from './chipName'
import { addTypeDropDown } from './typeDropDown'

export function addLabChipInfo(parent: BaseGuiElement, playerIndex: number) {
  const info = updateInfo(playerIndex)
  const {
    flow: chipNameFlow,
    label,
    textField,
    renameButton,
  } = addChipName(parent, info)
  const { flow: drowDownFlow, dropDown } = addTypeDropDown(parent, info)

  const updateGui = () => {
    updateInfo(playerIndex, info)
    chipNameFlow.visible = info.valid
    drowDownFlow.visible = info.valid
    if (!info.valid) return

    label.visible = !info.editing
    textField.visible = !!info.editing

    label.caption = info.chipName || ''
    textField.text = info.chipName || ''
    const chipType = info.chipType || 'empty'
    dropDown.selected_index = CHIP_TYPES.indexOf(chipType) + 1
  }
  const commitChipNameAndUpdate = () => {
    if (info.editing) {
      info.editing = false
      if (info.chipIndex !== undefined) {
        const name = textField.text.trim()
        if (name !== state.getChipName(info.chipIndex)) {
          state.setChipName(info.chipIndex, textField.text.trim())
          writeChipName(info.chipIndex)
        }
      }
    }
    updateGui()
  }
  const updateChipType = () => {
    if (info.chipIndex !== undefined) {
      const type = CHIP_TYPES[dropDown.selected_index - 1]
      state.setChipType(info.chipIndex, type)
      resetLabChip(info.chipIndex, playerIndex)
      resetAllNauvisChipsForIndex(info.chipIndex, playerIndex)
    }
    commitChipNameAndUpdate()
  }
  onGuiClicked(renameButton.name, playerIndex, () => {
    if (info.editing) commitChipNameAndUpdate()
    else {
      info.editing = true
      updateGui()
      textField.focus()
      textField.select_all()
    }
  })
  onGuiSelectionStateChanged(dropDown.name, playerIndex, updateChipType)
  onGuiConfirmed(textField.name, playerIndex, commitChipNameAndUpdate)
  onPlayerChangedSurface(playerIndex, commitChipNameAndUpdate)
  onPlayerChangedPosition(playerIndex, commitChipNameAndUpdate)
}

function updateInfo(playerIndex: number, info?: Info): Info {
  if (!info) info = { valid: false }
  const player = game.players[playerIndex]
  if (player?.surface.name !== 'lab') {
    info.valid = false
    return info
  }

  let hasChanged = false
  const set = <T extends keyof Info>(key: T, value: Info[T]) => {
    if (info[key] !== value) {
      info[key] = value
      hasChanged = true
    }
  }

  const chipIndex = positionToChipIndex(player.position)
  const valid = chipIndex !== undefined
  set('valid', valid)
  set('chipIndex', valid ? chipIndex : undefined)
  set('chipName', valid ? state.getChipName(chipIndex) : undefined)
  set('chipType', state.getChipType(chipIndex))
  set('editing', hasChanged ? false : info.editing)

  return info
}
