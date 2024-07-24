import { GuiElementType, LuaGuiElement, PlayerIndex } from 'factorio:runtime'

const TOP_ELEMENTS = [
  'top',
  'left',
  'center',
  'screen',
  'goal',
  'relative',
] as const

type TypedGuiElement<Type extends GuiElementType> = Extract<
  LuaGuiElement,
  { type: Type }
>

type NameToGuiElement<Type extends GuiElementType> = {
  [name: string]: TypedGuiElement<Type>
}
type TypeToNameToGuiElement = {
  [Type in GuiElementType]?: NameToGuiElement<Type>
}

const cache: { [player: number]: TypeToNameToGuiElement } = {}

export function findGui<Type extends GuiElementType>(
  name: string,
  type: Type,
  playerIndex: number,
): TypedGuiElement<Type> | undefined {
  const cached = cache[playerIndex]?.[type]?.[name]
  if (cached && cached.valid) return cached
  cache[playerIndex] = cache[playerIndex] ?? {}
  const player = game.get_player(playerIndex as PlayerIndex)
  if (!player) return
  const gui = player.gui
  for (const key of TOP_ELEMENTS) {
    const result = findGuiInternal(name, type, gui[key])
    if (result) {
      cache[playerIndex][type] = cache[playerIndex][type] || {}
      cache[playerIndex][type][name] = result
      return result
    }
  }
}

function findGuiInternal<Type extends GuiElementType>(
  name: string,
  type: Type,
  parent: LuaGuiElement,
): TypedGuiElement<Type> | undefined {
  if (!parent.valid) return
  if (parent.type === type && parent.name === name)
    return parent as TypedGuiElement<Type>
  for (const child of parent.children) {
    const result = findGuiInternal(name, type, child)
    if (result) return result
  }
}
