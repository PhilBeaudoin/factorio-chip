import { NthTickEventData } from 'factorio:runtime'
import { addToRegistry, callAll, createRegistry } from './registry'

const EACH_TICK_REGISTRY = createRegistry<NthTickEventData>()
script.on_nth_tick(1, (event) => {
  callAll(EACH_TICK_REGISTRY, event)
})
export function onEachTick(f: (e: NthTickEventData) => void) {
  return addToRegistry(EACH_TICK_REGISTRY, f)
}
