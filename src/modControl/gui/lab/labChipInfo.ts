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
  positionToChipIndex,
  resetAllNauvisChipsForIndex,
  resetLabChip,
  writeChipName,
} from '../../map'
import { Info } from './info'
import {
  addChipName,
  CHIP_RENAME_BUTTON,
  CHIP_TEXT_FIELD,
  focusTextField,
  getTextFieldText,
  updateChipName,
} from './chipName'
import {
  addTypeDropDown,
  CHIP_TYPE_DROP_DOWN,
  getDropDownChipType,
  updateTypeDropDown,
} from './typeDropDown'

declare module '../../state/state' {
  interface PlayerGlobal {
    labChipInfo?: Info
  }
}

export function addLabChipInfo(parent: BaseGuiElement, playerIndex: number) {
  const info = updateInfo(playerIndex)
  addChipName(parent, info)
  addTypeDropDown(parent, info)
}

function updateGui(playerIndex: number) {
  const info = updateInfo(playerIndex)
  updateChipName(playerIndex, info)
  updateTypeDropDown(playerIndex, info)
}

function commitChipNameAndUpdate(playerIndex: number) {
  const info = getInfo(playerIndex)
  if (info.editing) {
    info.editing = false
    if (info.chipIndex !== undefined) {
      const name = getTextFieldText(playerIndex).trim()
      if (name !== state.getChipName(info.chipIndex)) {
        state.setChipName(info.chipIndex, name)
        writeChipName(info.chipIndex)
      }
    }
  }
  updateGui(playerIndex)
}

function updateChipType(playerIndex: number) {
  const info = getInfo(playerIndex)
  if (info.chipIndex !== undefined) {
    state.setChipType(info.chipIndex, getDropDownChipType(playerIndex))
    resetLabChip(info.chipIndex, playerIndex)
    resetAllNauvisChipsForIndex(info.chipIndex, playerIndex)
  }
  commitChipNameAndUpdate(playerIndex)
}

const getInfo = (playerIndex: number): Info => {
  const pg = state.getPlayerGlobal(playerIndex)
  if (!pg.labChipInfo) pg.labChipInfo = { valid: false }
  return pg.labChipInfo
}

function updateInfo(playerIndex: number): Info {
  const player = game.players[playerIndex]
  const info = getInfo(playerIndex)
  if (!info) return { valid: false }
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

////// EVENTS //////

onGuiClicked(CHIP_RENAME_BUTTON, (e) => {
  const playerIndex = e.player_index
  const info = getInfo(playerIndex)
  if (info.editing) commitChipNameAndUpdate(playerIndex)
  else {
    info.editing = true
    updateGui(playerIndex)
    focusTextField(playerIndex)
  }
})

onGuiSelectionStateChanged(CHIP_TYPE_DROP_DOWN, (e) =>
  updateChipType(e.player_index),
)
onGuiConfirmed(CHIP_TEXT_FIELD, (e) => commitChipNameAndUpdate(e.player_index))
onPlayerChangedSurface((e) => commitChipNameAndUpdate(e.player_index))
onPlayerChangedPosition((e) => commitChipNameAndUpdate(e.player_index))
