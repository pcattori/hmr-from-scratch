import path from 'node:path'

import esbuild from 'esbuild'

import * as Paths from '../utils/paths'

export type Event = { type: 'reload' }

let runtime = path.join(__dirname, 'runtime.ts')

export let buildRuntime = async () => {
  await esbuild.build({
    bundle: true,
    entryPoints: [runtime],
    outfile: path.join(Paths.buildDir, 'live-reload-runtime.js'),
  })
}

