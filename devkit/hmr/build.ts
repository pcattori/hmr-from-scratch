import esbuild from 'esbuild'
import prettier from 'prettier'

import * as Paths from '../utils/paths'
import * as HmrRuntimeVirtualModule from './runtime-virtual-module'

export let build = async (): Promise<string> => {
  let result = await esbuild.build({
    bundle: true,
    entryPoints: [HmrRuntimeVirtualModule.entrypoint],
    plugins: [await HmrRuntimeVirtualModule.plugin(Paths.entrypoint)],
    treeShaking: true,
    write: false,
  })
  let output = result.outputFiles[0].text
  return prettier.format(output, { parser: 'babel-ts' })
}
