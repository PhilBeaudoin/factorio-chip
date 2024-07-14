import { addToggleLabButton } from './toggleLab'
import { addChipInfo } from './chipInfo'

const playerInitiated: Record<number, boolean> = {}
const FRAME_NAME = 'factorio-chip-ui-permanent-frame'

export function createPermanentFrame(playerIndex: number) {
  const player = game.players[playerIndex]
  if (playerInitiated[player.index]) return
  playerInitiated[player.index] = true
  const frame = player?.gui.screen?.add({
    type: 'frame',
    name: FRAME_NAME,
    direction: 'vertical',
  })
  addToggleLabButton(frame, player.index)
  addChipInfo(frame, player.index)
}
