import { LuaSurface, MapPosition } from 'factorio:runtime'
import { resetChipFromTemplate } from './template'

const TEMPLATE =
  '             oo             ' +
  '             oo             ' +
  '             oo             ' +
  '             oo             ' +
  '        ~~~~~oo~~~~~        ' +
  '      ~~~~~~~oo~~~~~~~      ' +
  '     ~~~~~~~~oo~~~~~~~~     ' +
  '     ~~~~~~~~oo~~~~~~~~     ' +
  '    ~~~~~~~~~oo~~~~~~~~~    ' +
  '    ~~~~~..........~~~~~    ' +
  '    ~~~~~..........~~~~~    ' +
  '    ~~~~~..........~~~~~    ' +
  '    ~~~~~..........~~~~~    ' +
  'ooooooooo..........ooooooooo' +
  'ooooooooo..........ooooooooo' +
  '    ~~~~~..........~~~~~    ' +
  '    ~~~~~..........~~~~~    ' +
  '    ~~~~~..........~~~~~    ' +
  '    ~~~~~..........~~~~~    ' +
  '    ~~~~~~~~~oo~~~~~~~~~    ' +
  '     ~~~~~~~~oo~~~~~~~~     ' +
  '     ~~~~~~~~oo~~~~~~~~     ' +
  '      ~~~~~~~oo~~~~~~~      ' +
  '        ~~~~~oo~~~~~        ' +
  '             oo             ' +
  '             oo             ' +
  '             oo             ' +
  '             oo             '

export function resetEmptyChip(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  resetChipFromTemplate(surface, chunkPosition, playerIndex, TEMPLATE)
}
