import { LuaSurface } from 'factorio:runtime'
import { debug } from '../debug'

let initialized = false
const charToIndex: { [key: string]: number } = {}

const ENTITY_NAME = 'textplate-small-iron'

interface TpDict {
  name: string
  symbols: { [key: number]: string }
}

type TpCharDict = { [key: string]: string }

function init() {
  if (initialized) return
  initialized = true

  const dicts = remote.call('textplates', 'textplates_add_types') as TpDict[]
  const symbols = dicts.find((v: any) => v.name === ENTITY_NAME)?.symbols
  if (!symbols) {
    debug(`No textplate symbols found for ${ENTITY_NAME}`)
    return
  }
  const symbolToIndex: { [key: string]: number } = {}
  for (const [k, v] of Object.entries(symbols)) symbolToIndex[v] = parseInt(k)

  const charToSymbol = remote.call(
    'textplates',
    'textplates_add_characters_for_symbols',
  ) as TpCharDict

  for (const [k, v] of Object.entries(charToSymbol)) {
    if (v in symbolToIndex) charToIndex[k] = symbolToIndex[v]
  }
}

export function write(surface: LuaSurface, x: number, y: number, text: string) {
  init()
  const entities = surface.find_entities_filtered({
    area: {
      left_top: { x, y },
      right_bottom: { x: x + text.length, y: y + 1 },
    },
    name: ENTITY_NAME,
  })
  entities.forEach((e) => e.destroy())
  for (let i = 0; i < text.length; i++) writeChar(surface, x + i, y, text[i])
}

function writeChar(surface: LuaSurface, x: number, y: number, char: string) {
  if (char === ' ') return
  let index = charToIndex[char.toLowerCase()]
  if (!index) index = 1
  const entity = surface.create_entity({
    name: ENTITY_NAME,
    position: { x, y },
    force: 'neutral',
  })
  if (entity) {
    entity.minable = false
    entity.destructible = false
    entity.operable = false
    entity.graphics_variation = index
  }
}
