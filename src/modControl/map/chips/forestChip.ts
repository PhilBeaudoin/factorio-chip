import { LuaSurface, MapPosition } from 'factorio:runtime'
import { resetChipFromTemplate } from './template'

const TEMPLATE =
  'oooooooooooooooooooooooooooo' +
  'ooo..ooooooooooooooooo...ooo' +
  'ooo.t..o...oooo..t..o..t.ooo' +
  'oooo.....t..oo..........oooo' +
  'oooo..t....tt...t..t..oooooo' +
  'ooo..t...t..t.t.....t..ooooo' +
  'ooooo.......t....t.tt..ooooo' +
  'oooo....t.t...t.......oooooo' +
  'ooo...tt....t...t....ooooooo' +
  'oo.t..t.tt.t.t.tt.t.t..ooooo' +
  'ooo..t.t.t..t..t..t...tooooo' +
  'oo.tt.t..t.t..t.....t.tooooo' +
  'ooo...t.t...t.tt.t....tooooo' +
  'ooot...tt..t.t....ttt..ooooo' +
  'ooo..t..t.t..........t.ooooo' +
  'oo.t.tt.t..t....t......ooooo' +
  'oo..t..t.t..tt.....t.t.ooooo' +
  'ooo.tt.t..tt.t.....t.t.ooooo' +
  'ooo..t.t...t..tt.t..t....ooo' +
  'ooo....t.tt...t.....t.tt.ooo' +
  'ooooo..t................oooo' +
  'oo..oo.....t...t.tt.t..ooooo' +
  'oo.t.oooo..oo..t.....t.ooooo' +
  'ooo..ooooooooo.....t..t..ooo' +
  'oooooo..ooo.....oo...tt..ooo' +
  'oooo...t.ooo..t..oooo....ooo' +
  'ooo.t...ooooo...ooooooo.t.oo' +
  'oooo..oooooooooooooooooo..oo'

export function resetForestChip(
  surface: LuaSurface,
  chunkPosition: MapPosition,
  playerIndex: number | undefined,
) {
  resetChipFromTemplate(surface, chunkPosition, playerIndex, TEMPLATE)
}
