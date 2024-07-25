import { BaseGuiElement } from 'factorio:runtime'
import {
  onGuiSelectionStateChanged,
  onPlayerChangedPosition,
  onPlayerChangedSurface,
} from '../../events'
import { state } from '../../state'
import { resetNauvisChip, toChunkPosition } from '../../map'
import { Info, NONE_ITEM } from './info'
import {
  addNameDropDown,
  CHIP_NAME_DROP_DOWN,
  getDropDownChipIndex,
  updateNameDropDown,
} from './nameDropDown'

declare module '../../state/state' {
  interface PlayerGlobal {
    nauvisChipInfo?: Info
  }
}

export function addNauvisChipInfo(parent: BaseGuiElement, playerIndex: number) {
  const info = updateInfo(playerIndex)
  addNameDropDown(parent, info)
}
function updateGui(playerIndex: number) {
  const info = updateInfo(playerIndex)
  updateNameDropDown(playerIndex, info)
}

function updateChip(playerIndex: number) {
  const info = getInfo(playerIndex)
  if (!info.chunkPosition) return
  const chipIndex = getDropDownChipIndex(playerIndex)
  state.setChipAtChunk(
    info.chunkPosition,
    chipIndex >= 0 ? chipIndex : undefined,
  )
  resetNauvisChip(info.chunkPosition, playerIndex)
  updateGui(playerIndex)
}

const getInfo = (playerIndex: number): Info => {
  const pg = state.getPlayerGlobal(playerIndex)
  if (!pg.nauvisChipInfo) pg.nauvisChipInfo = { valid: false }
  return pg.nauvisChipInfo
}

function updateInfo(playerIndex: number): Info {
  const player = game.players[playerIndex]
  const info = getInfo(playerIndex)
  if (player?.surface.name !== 'nauvis') {
    info.valid = false
    return info
  }

  info.valid = true
  info.chunkPosition = toChunkPosition(player.position)
  info.chipIndex = state.getChipAtChunk(info.chunkPosition)
  info.chipNames = [NONE_ITEM, ...state.getChipNames()]
  info.chipName =
    info.chipIndex !== undefined ? state.getChipName(info.chipIndex) : undefined

  return info
}

////// EVENTS //////

onGuiSelectionStateChanged(CHIP_NAME_DROP_DOWN, (e) =>
  updateChip(e.player_index),
)
onPlayerChangedSurface((e) => updateGui(e.player_index))
onPlayerChangedPosition((e) => updateGui(e.player_index))
