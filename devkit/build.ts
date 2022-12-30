import esbuild from 'esbuild'
import fse from 'fs-extra'

import * as Paths from './utils/paths'

export let build = async (): Promise<void> => {
  await fse.ensureDir(Paths.buildDir)

  await esbuild.build({
    bundle: true,
    entryPoints: [Paths.entrypoint],
    outfile: Paths.bundle,
  })
}
