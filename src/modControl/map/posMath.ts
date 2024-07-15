import { MapPosition } from 'factorio:runtime'

export function posAdd(a: MapPosition, b: MapPosition): MapPosition {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function posSub(a: MapPosition, b: MapPosition): MapPosition {
  return { x: a.x - b.x, y: a.y - b.y }
}

export function posMult(a: MapPosition, n: number): MapPosition {
  return { x: a.x * n, y: a.y * n }
}

export function posEq(a: MapPosition, b: MapPosition): boolean {
  return a.x === b.x && a.y === b.y
}
