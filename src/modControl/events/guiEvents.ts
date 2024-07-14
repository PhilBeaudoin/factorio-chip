import {
  OnGuiClickEvent,
  OnGuiClosedEvent,
  OnGuiConfirmedEvent,
  OnGuiSelectionStateChangedEvent,
} from 'factorio:runtime'
import { addToRegistry, callAll, createRegistry } from './registry'

const CLICK_REGISTRY = createRegistry<OnGuiClickEvent>()
script.on_event(defines.events.on_gui_click, (e) => {
  callAll(CLICK_REGISTRY, e)
})
export function onGuiClicked(
  name: string,
  playerIndex: number,
  f: (e: OnGuiClickEvent) => void,
) {
  return addToRegistry(CLICK_REGISTRY, (e) => {
    const { element: el, player_index: i } = e
    if (el?.valid && el?.name === name && i === playerIndex) f(e)
  })
}

const SELECTION_CHANGED_REGISTRY =
  createRegistry<OnGuiSelectionStateChangedEvent>()
script.on_event(defines.events.on_gui_selection_state_changed, (e) => {
  callAll(SELECTION_CHANGED_REGISTRY, e)
})
export function onGuiSelectionStateChanged(
  name: string,
  playerIndex: number,
  f: (e: OnGuiSelectionStateChangedEvent) => void,
) {
  return addToRegistry(SELECTION_CHANGED_REGISTRY, (e) => {
    const { element: el, player_index: i } = e
    if (el?.valid && el?.name === name && i === playerIndex) f(e)
  })
}

const CLOSED_REGISTRY = createRegistry<OnGuiClosedEvent>()
script.on_event(defines.events.on_gui_closed, (e) => {
  callAll(CLOSED_REGISTRY, e)
})
export function onGuiClosed(
  name: string,
  playerIndex: number,
  f: (e: OnGuiClosedEvent) => void,
) {
  return addToRegistry(CLOSED_REGISTRY, (e) => {
    const { element: el, player_index: i } = e
    if (el?.valid && el?.name === name && i === playerIndex) f(e)
  })
}

const CONFIRMED_REGISTRY = createRegistry<OnGuiConfirmedEvent>()
script.on_event(defines.events.on_gui_confirmed, (e) => {
  callAll(CONFIRMED_REGISTRY, e)
})
export function onGuiConfirmed(
  name: string,
  playerIndex: number,
  f: (e: OnGuiConfirmedEvent) => void,
) {
  return addToRegistry(CONFIRMED_REGISTRY, (e) => {
    const { element: el, player_index: i } = e
    if (el?.valid && el?.name === name && i === playerIndex) f(e)
  })
}
