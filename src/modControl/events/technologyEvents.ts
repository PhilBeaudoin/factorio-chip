import { OnResearchFinishedEvent } from 'factorio:runtime'
import { addToRegistry, callAll, createRegistry } from './registry'

const RESEARCH_FINISHED_REGISTRY = createRegistry<OnResearchFinishedEvent>()
script.on_event(defines.events.on_research_finished, (event) => {
  callAll(RESEARCH_FINISHED_REGISTRY, event)
})
export function onResearchFinished(f: (e: OnResearchFinishedEvent) => void) {
  return addToRegistry(RESEARCH_FINISHED_REGISTRY, f)
}
