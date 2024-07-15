import { addLabChipInfo } from './lab'
import { addNauvisChipInfo } from './nauvis/nauvisChipInfo'
import { addToggleLabButton } from './toggleLab'

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
  addNauvisChipInfo(frame, player.index)
  addLabChipInfo(frame, player.index)
}
