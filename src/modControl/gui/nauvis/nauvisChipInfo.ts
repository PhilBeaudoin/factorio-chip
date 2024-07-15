import { BaseGuiElement } from 'factorio:runtime'
import {
  onGuiSelectionStateChanged,
  onPlayerChangedPosition,
  onPlayerChangedSurface,
} from '../../events'
import { state } from '../../state'
import { resetNauvisChip, toChunkPosition } from '../../map'
import { Info, NONE_ITEM } from './info'
import { addNameDropDown } from './nameDropDown'
import { getItemsAndIndex } from './items'

export function addNauvisChipInfo(parent: BaseGuiElement, playerIndex: number) {
  const info = updateInfo(playerIndex)
  const { flow, dropDown } = addNameDropDown(parent, info)

  const updateGui = () => {
    updateInfo(playerIndex, info)
    flow.visible = info.valid
    if (!info.valid) return
    const { items, selected_index } = getItemsAndIndex(info)
    dropDown.items = items as string[]
    dropDown.selected_index = selected_index
  }
  const updateChip = () => {
    if (!info.chunkPosition || dropDown.selected_index < 1) return
    // -2 ==> -1 for NONE_ITEM, -1 for 0-indexed
    const chipIndex = dropDown.selected_index - 2
    state.setChipAtChunk(
      info.chunkPosition,
      chipIndex >= 0 ? chipIndex : undefined,
    )
    resetNauvisChip(info.chunkPosition, playerIndex)
    updateGui()
  }
  onGuiSelectionStateChanged(dropDown.name, playerIndex, updateChip)
  onPlayerChangedSurface(playerIndex, updateGui)
  onPlayerChangedPosition(playerIndex, updateGui)
}

function updateInfo(playerIndex: number, info?: Info): Info {
  if (!info) info = { valid: false }
  const player = game.players[playerIndex]
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
