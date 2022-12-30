import { Command } from 'commander'

import { serve } from './serve'
import { build } from './build'
import { watch } from './watch'

let program = new Command()
program.command('serve').action(serve)
program.command('build').action(build)
program.command('watch').action(async () => {
  await build()
  await watch()
  await serve()
})
program.parse()
