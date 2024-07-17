import { LuaEntity, LuaPlayer } from 'factorio:runtime'
import { syncAssemblingMachines } from './assemblingMachine'

type SyncFunction = (
  lab: LuaEntity,
  nauvis: LuaEntity,
  player: LuaPlayer,
) => void

const SYNC_FUNCTIONS: { [type: string]: SyncFunction } = {
  'assembling-machine': syncAssemblingMachines,
}

export function syncMathingEntities(
  lab: LuaEntity,
  nauvis: LuaEntity,
  player: LuaPlayer,
) {
  nauvis.direction = lab.direction
  const f = SYNC_FUNCTIONS[lab.type]
  if (f !== undefined) f(lab, nauvis, player)
}
