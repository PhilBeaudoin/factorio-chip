import { LuaPlayer } from 'factorio:runtime'
import { createPermanentFrame } from './permanentFrame'

const initializedPlayer: { [index: number]: boolean } = {}

export function init(player: LuaPlayer) {
  const playerIndex = player.index
  if (!initializedPlayer[playerIndex]) {
    initializedPlayer[playerIndex] = true
    createPermanentFrame(playerIndex)
  }
}
