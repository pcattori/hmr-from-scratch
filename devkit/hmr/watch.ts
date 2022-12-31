import path from 'node:path'

import chokidar from 'chokidar'

import * as Paths from '../utils/paths'
import { build } from './build'

let relative = (file: string) => path.relative(Paths.appDir, file)

export let watch = async (
  options: {
    onFileAdded?: (file: string) => void
    onFileChanged?: (file: string) => void
    onFileDeleted?: (file: string) => void
  } = {},
) => {
  let watcher = chokidar.watch(Paths.appDir, { ignoreInitial: true })
  watcher
    .on('error', console.error)
    .on('add', async (file) => {
      console.info(`File added: ${relative(file)}`)
      await build()
      options.onFileAdded?.(file)
    })
    .on('change', async (file) => {
      console.info(`File changed: ${relative(file)}`)
      await build()
      options.onFileChanged?.(file)
    })
    .on('unlink', async (file) => {
      console.info(`File unlinked: ${relative(file)}`)
      await build()
      options.onFileDeleted?.(file)
    })
  return watcher.close
}
