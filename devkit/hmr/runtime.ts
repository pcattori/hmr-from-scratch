import * as path from '../utils/path.browser'
import * as Socket from '../utils/socket.browser'
import * as HmrEvent from './event'
import * as Module from './module.browser'

export let hmr = (
  initialModules: Record<string, Module.T>,
  entrypoint: string,
) => {
  let modules = initialModules

  let _require = (source: string, from?: string): Module.Exports => {
    let resolvedSource = from ? path.resolve(from + '/' + source) : source
    let mod = modules[resolvedSource]
    if (mod === undefined) {
      throw Error(`Cannot find module: '${source}'`)
    }
    let run = Module.asFunction(mod)
    return run((source) => _require(source, resolvedSource))
  }

  _require(entrypoint)

  let applyUpdate = (event: Socket.Event) => {
    if (event.type === 'hmr/add') {
      let { id, mod } = event as HmrEvent.Add
      modules[id] = mod
      return
    }
    if (event.type === 'hmr/change') {
      let { id, mod } = event as HmrEvent.Change
      modules[id] = mod
      return
    }
    if (event.type === 'hmr/delete') {
      let { id } = event as HmrEvent.Delete
      delete modules[id]
      return
    }
    throw Error(`Unrecognized event type: ${event.type}`)
  }

  Socket.connect((data) => {
    let event = JSON.parse(data) as Socket.Event

    applyUpdate(event)

    try {
      _require(entrypoint)
    } catch (error) {
      console.error(error)
    }
  })
}
