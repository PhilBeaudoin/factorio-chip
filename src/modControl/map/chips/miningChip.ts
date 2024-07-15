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
  '    ~~~~~~iii..sss~~~~~~    ' +
  '    ~~~~~iiii..ssss~~~~~    ' +
  '    ~~~~~iiii..ssss~~~~~    ' +
  '    ~~~~~iii....sss~~~~~    ' +
  'ooooooooo..........ooooooooo' +
  'ooooooooo..........ooooooooo' +
  '    ~~~~~xxx....ccc~~~~~    ' +
  '    ~~~~~xxxx..cccc~~~~~    ' +
  '    ~~~~~xxxx..cccc~~~~~    ' +
  '    ~~~~~~xxx..ccc~~~~~~    ' +
  '    ~~~~~~~~~oo~~~~~~~~~    ' +
  '     ~~~~~~~~oo~~~~~~~~     ' +
  '     ~~~~~~~~oo~~~~~~~~     ' +
  '      ~~~~~~~oo~~~~~~~      ' +
  '        ~~~~~oo~~~~~        ' +
  '             oo             ' +
  '             oo             ' +
  '             oo             ' +
  '             oo             '

export function resetMiningChip(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  resetChipFromTemplate(surface, chunkPosition, playerIndex, TEMPLATE)
}
