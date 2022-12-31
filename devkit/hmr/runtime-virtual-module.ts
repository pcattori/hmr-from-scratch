import esbuild from 'esbuild'

import * as Module from './module.server'

export let entrypoint = 'virtual:hmr-runtime'
let pattern = /^virtual:hmr-runtime/

export let plugin = async (entrypoint: string): Promise<esbuild.Plugin> => {
  let modules = await Module.crawlDependencies(entrypoint)
  let vmod = [
    "import { hmr } from './runtime.ts'",
    `const initialModules = ${JSON.stringify(modules)}`,
    `const entrypoint = ${JSON.stringify(Module.id(entrypoint))}`,
    `hmr(initialModules, entrypoint)`,
  ].join('\n')

  return {
    name: 'virtual:hmr',
    setup(build) {
      build.onResolve({ filter: pattern }, ({ path }) => {
        return {
          namespace: 'virtual:hmr',
          path,
        }
      })
      build.onLoad({ filter: pattern }, () => {
        return {
          resolveDir: __dirname,
          loader: 'ts',
          contents: vmod,
        }
      })
    },
  }
}
