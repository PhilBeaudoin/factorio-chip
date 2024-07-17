import { LuaEntity } from 'factorio:runtime'
import { syncAllChips } from './main'

export function builtEntityLab(entity: LuaEntity, _playerIndex: number) {
  if (!entity.valid) return
  entity.destructible = false
  entity.active = false
}

export function leftLab(playerIndex: number) {
  syncAllChips(playerIndex)
}
