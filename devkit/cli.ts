import { Command } from 'commander'

import { serve } from './serve'
import { build } from './build'
import { watch } from './watch'
import * as Socket from './utils/socket.server'
import * as LiveReload from './live-reload'

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
program.parse()
