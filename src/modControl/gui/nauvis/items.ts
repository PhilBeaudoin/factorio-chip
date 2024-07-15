import { Info } from './info'

export function getItemsAndIndex(info: Info) {
  const items = info.chipNames ?? []
  const index = info.chipName === undefined ? 0 : items.indexOf(info.chipName)
  return { items, selected_index: index + 1 }
}
