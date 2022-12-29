import { Command } from 'commander'

import { serve } from './serve'

let program = new Command()
program.command('serve').action(serve)
program.parse()
