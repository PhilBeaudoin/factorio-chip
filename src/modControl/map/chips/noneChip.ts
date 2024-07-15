import { LuaSurface, MapPosition } from 'factorio:runtime'
import { resetChipFromTemplate } from './template'

const TEMPLATE =
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            ' +
  '                            '

export function resetNoneChip(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  resetChipFromTemplate(surface, chunkPosition, playerIndex, TEMPLATE)
}
