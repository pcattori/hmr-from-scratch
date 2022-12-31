import fs from 'node:fs/promises'
import path from 'node:path'

import esbuild from 'esbuild'

import { Module } from './module'

export type T = Module

export let id = (_path: string): string => {
  let { dir, name } = path.parse(_path)
  return path.join(dir, name)
}

let transpile = async (tsx: string): Promise<string> => {
  let result = await esbuild.transform(tsx, { loader: 'tsx', format: 'cjs' })
  result.warnings.forEach(console.warn)
  return result.code
}

export let crawlDependencies = async (
  entrypoint: string,
): Promise<Record<string, Module>> => {
  let result = await esbuild.build({
    bundle: true,
    entryPoints: [entrypoint],
    metafile: true,
    write: false,
  })

  let inputs = Object.entries(result.metafile!.inputs)

  let modules = await Promise.all(
    inputs.map(async ([relativePath, { imports }]) => {
      let _path = path.resolve(relativePath)

      let tsx = await fs.readFile(_path, 'utf8')
      let commonjs = await transpile(tsx)

      return [
        id(_path),
        {
          code: commonjs,
          dependencies: imports.map((dep) => path.resolve(dep.path)),
        }
      ] as const
    }),
  )
  return Object.fromEntries(modules)
}
