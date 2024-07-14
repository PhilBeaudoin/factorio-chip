import {
  OnChunkGeneratedEvent,
  OnSurfaceCreatedEvent,
  OnSurfaceDeletedEvent,
} from 'factorio:runtime'
import { addToRegistry, callAll, createRegistry } from './registry'

const CREATED_REGISTRY = createRegistry<OnSurfaceCreatedEvent>()
script.on_event(defines.events.on_surface_created, (event) => {
  callAll(CREATED_REGISTRY, event)
})
export function onSurfaceCreated(f: (e: OnSurfaceCreatedEvent) => void) {
  return addToRegistry(CREATED_REGISTRY, f)
}

const DELETED_REGISTRY = createRegistry<OnSurfaceDeletedEvent>()
script.on_event(defines.events.on_surface_deleted, (event) => {
  callAll(DELETED_REGISTRY, event)
})
export function onSurfaceDeleted(f: (e: OnSurfaceDeletedEvent) => void) {
  return addToRegistry(DELETED_REGISTRY, f)
}

const CHUNK_GENERATED_REGISTRY = createRegistry<OnChunkGeneratedEvent>()
script.on_event(defines.events.on_chunk_generated, (event) => {
  callAll(CHUNK_GENERATED_REGISTRY, event)
})
export function onChunkGenerated(f: (e: OnChunkGeneratedEvent) => void) {
  return addToRegistry(CHUNK_GENERATED_REGISTRY, f)
}
