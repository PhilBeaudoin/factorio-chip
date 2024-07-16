import { LuaEntity, LuaPlayer } from 'factorio:runtime'
import { isNameOrGhost } from './utils'

export function syncAssemblingMachines(
  lab: LuaEntity,
  nauvis: LuaEntity,
  player: LuaPlayer,
) {
  if (
    !lab.valid ||
    !nauvis.valid ||
    lab.type !== 'assembling-machine' ||
    !isNameOrGhost(nauvis, lab.name)
  )
    return
  nauvis.set_recipe(lab.get_recipe())

  // Match modules
  const request = lab.get_module_inventory()?.get_contents() ?? {}
  if (nauvis.name === 'entity-ghost') {
    nauvis.item_requests = request
  } else {
    const current = nauvis.get_module_inventory()?.get_contents() ?? {}
    for (const [name, count] of Object.entries(current)) {
      const toRemove = Math.max(count - (request[name] ?? 0), 0)
      nauvis.get_module_inventory()?.remove({ name, count: toRemove })
      player.get_main_inventory()?.insert({ name, count: toRemove })
      current[name] -= toRemove
    }
    const toAdd: { [name: string]: number } = {}
    for (const [name, count] of Object.entries(request)) {
      const toInsert = Math.max(count - (current[name] ?? 0), 0)
      if (toInsert > 0) toAdd[name] = toInsert
    }

    const oldRequestProxy = nauvis.surface.find_entity(
      'item-request-proxy',
      nauvis.position,
    )
    if (oldRequestProxy) oldRequestProxy.destroy()
    if (Object.keys(toAdd).length !== 0) {
      nauvis.surface.create_entity({
        name: 'item-request-proxy',
        position: nauvis.position,
        force: nauvis.force,
        player,
        target: nauvis,
        modules: toAdd,
        raise_built: true,
      })
    }
  }
}
