import {
  OnGuiClickEvent,
  OnGuiClosedEvent,
  OnGuiConfirmedEvent,
  OnGuiSelectionStateChangedEvent,
} from 'factorio:runtime'
import { callAll, createRegistry, onNamedPlayerEvent } from './registry'

const CLICK_REGISTRY = createRegistry<OnGuiClickEvent>()
script.on_event(defines.events.on_gui_click, (e) => {
  callAll(CLICK_REGISTRY, e)
})

export function onGuiClicked(
  name: string,
  f: (e: OnGuiClickEvent) => void,
): () => void
export function onGuiClicked(
  name: string,
  playerIndex: number,
  f: (e: OnGuiClickEvent) => void,
): () => void
export function onGuiClicked(
  name: string,
  p1: number | ((e: OnGuiClickEvent) => void),
  p2?: (e: OnGuiClickEvent) => void,
) {
  return onNamedPlayerEvent(CLICK_REGISTRY, name, p1, p2)
}

const SELECTION_CHANGED_REGISTRY =
  createRegistry<OnGuiSelectionStateChangedEvent>()
script.on_event(defines.events.on_gui_selection_state_changed, (e) => {
  callAll(SELECTION_CHANGED_REGISTRY, e)
})
export function onGuiSelectionStateChanged(
  name: string,
  f: (e: OnGuiSelectionStateChangedEvent) => void,
): () => void
export function onGuiSelectionStateChanged(
  name: string,
  playerIndex: number,
  f: (e: OnGuiSelectionStateChangedEvent) => void,
): () => void
export function onGuiSelectionStateChanged(
  name: string,
  p1: number | ((e: OnGuiSelectionStateChangedEvent) => void),
  p2?: (e: OnGuiSelectionStateChangedEvent) => void,
) {
  return onNamedPlayerEvent(SELECTION_CHANGED_REGISTRY, name, p1, p2)
}

const CLOSED_REGISTRY = createRegistry<OnGuiClosedEvent>()
script.on_event(defines.events.on_gui_closed, (e) => {
  callAll(CLOSED_REGISTRY, e)
})
export function onGuiClosed(
  name: string,
  f: (e: OnGuiClosedEvent) => void,
): () => void
export function onGuiClosed(
  name: string,
  playerIndex: number,
  f: (e: OnGuiClosedEvent) => void,
): () => void
export function onGuiClosed(
  name: string,
  p1: number | ((e: OnGuiClosedEvent) => void),
  p2?: (e: OnGuiClosedEvent) => void,
) {
  return onNamedPlayerEvent(CLOSED_REGISTRY, name, p1, p2)
}

const CONFIRMED_REGISTRY = createRegistry<OnGuiConfirmedEvent>()
script.on_event(defines.events.on_gui_confirmed, (e) => {
  callAll(CONFIRMED_REGISTRY, e)
})
export function onGuiConfirmed(
  name: string,
  f: (e: OnGuiConfirmedEvent) => void,
): () => void
export function onGuiConfirmed(
  name: string,
  playerIndex: number,
  f: (e: OnGuiConfirmedEvent) => void,
): () => void
export function onGuiConfirmed(
  name: string,
  p1: number | ((e: OnGuiConfirmedEvent) => void),
  p2?: (e: OnGuiConfirmedEvent) => void,
) {
  return onNamedPlayerEvent(CONFIRMED_REGISTRY, name, p1, p2)
}
