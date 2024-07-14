import { FrameGuiElement } from 'factorio:runtime'
import { onGuiClosed } from '../events'
import { addTitleBar } from './titleBar'

const active: Record<number, boolean> = {}

interface Result {
  onClose: () => void
  onCleanup: (f: () => void) => void
  frame: FrameGuiElement
}

export function createDialogBox(
  name: string,
  playerIndex: number,
): Result | undefined {
  const player = game.players[playerIndex]
  if (active[playerIndex] || !player?.gui.screen) return undefined
  active[playerIndex] = true
  const direction = 'vertical'
  const frame = player.gui.screen.add({ type: 'frame', name, direction })
  frame.auto_center = true
  frame.style.minimal_width = 300
  player.opened = frame

  let cleanupFuncs: (() => void)[] = []
  const onCleanup = (f: () => void) => cleanupFuncs.push(f)
  const onClose = () => {
    cleanupFuncs.forEach((f) => f())
    cleanupFuncs = []
    active[playerIndex] = false
    player.opened = undefined
    frame.destroy()
  }
  onCleanup(
    addTitleBar(frame, playerIndex, ['controls.factorio-chip-rename'], onClose),
  )
  onCleanup(onGuiClosed(name, playerIndex, onClose))
  return { onClose, onCleanup, frame }
}
