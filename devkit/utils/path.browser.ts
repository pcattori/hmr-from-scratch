/**
 * Emulate Node's `path.resolve` for in-browser use.
 */
export let resolve = (_path: string): string => {
  let segments = _path.split('/')

  let resolved: string[] = []
  for (let segment of segments) {
    if (segment === '.' && resolved.length > 1) {
      resolved.pop()
      continue
    }
    if (segment === '..' && resolved.length > 1) {
      resolved.pop()
      resolved.pop()
      continue
    }
    resolved.push(segment)
  }
  return resolved.join('/')
}
