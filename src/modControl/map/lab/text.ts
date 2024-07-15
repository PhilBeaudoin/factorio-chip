import { state } from '../../state'
import { destroyEntitiesAt } from '../entities'
import { posAdd } from '../posMath'
import { write } from '../text'
import { chipIndexToChunkPosition } from './utils'

export function writeChipName(chipIndex: number) {
  const surface = game.get_surface('lab')
  if (!surface) return
  const { x: cx, y: cy } = chipIndexToChunkPosition(chipIndex)
  const left_top = { x: cx * 32, y: cy * 32 }
  const right_bottom = posAdd(left_top, { x: 32, y: 1 })
  const area = { left_top, right_bottom }
  destroyEntitiesAt(surface, area, undefined)
  const name = state.getChipName(chipIndex).slice(0, 32)
  write(surface, left_top.x, left_top.y, name)
}
