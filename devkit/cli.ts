import { Command } from 'commander'

import { serve } from './serve'
import { build } from './build'
import { watch } from './watch'
import * as Socket from './utils/socket.server'
import * as LiveReload from './live-reload'
import * as Hmr from './hmr'

let program = new Command()
program.command('serve').action(serve)
program.command('build').action(build)
program.command('watch').action(async () => {
  await build()
  await watch()
  await serve()
})
program.command('live-reload').action(async () => {
  await build()
  await LiveReload.buildRuntime()

  let send = Socket.serve<LiveReload.Event>()
  await watch({
    onRebuild: () => send({ type: 'reload' }),
  })

  await serve()
})
program.command('hmr').action(async () => {
  await Hmr.build()

  let send = Socket.serve<Hmr.Event>()
  await Hmr.watch({
    onFileAdded: async (file) => {
      let id = Hmr.Module.id(file)
      let modules = await Hmr.Module.crawlDependencies(file)
      let mod = modules[id]
      send({ type: 'hmr/add', id, mod })
    },
    onFileChanged: async (file) => {
      let id = Hmr.Module.id(file)
      let modules = await Hmr.Module.crawlDependencies(file)
      let mod = modules[id]
      send({ type: 'hmr/change', id, mod })
    },
    onFileDeleted: async (file) => {
      let id = Hmr.Module.id(file)
      send({ type: 'hmr/delete', id })
    },
  })

  await Hmr.serve()
})
program.parse()
