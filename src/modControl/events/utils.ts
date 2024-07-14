export function optionalNumber<T>(
  p1: number | T,
  p2?: T,
): { n?: number; f: T } {
  if (typeof p1 === 'number') {
    if (p2 === undefined) throw new Error('p2 is required')
    return { n: p1, f: p2 }
  }
  if (p2 !== undefined) throw new Error('p2 must not be provided')
  return { f: p1 }
}

export function optionalString<T>(
  p1: string | T,
  p2?: T,
): { v?: string; f: T } {
  if (typeof p1 === 'string') {
    if (p2 === undefined) throw new Error('p2 is required')
    return { v: p1, f: p2 }
  }
  if (p2 !== undefined) throw new Error('p2 must not be provided')
  return { f: p1 }
}
