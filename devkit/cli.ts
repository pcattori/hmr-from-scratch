import { Command } from 'commander'

import { serve } from './serve'
import { build } from './build'

let program = new Command()
program.command('serve').action(serve)
program.command('build').action(build)
program.parse()
