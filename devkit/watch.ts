import path from 'node:path'

import chokidar from 'chokidar'

import * as Paths from './utils/paths'
import { build } from './build'

let relative = (file: string) => path.relative(Paths.appDir, file)

export let watch = async () => {
  let watcher = chokidar.watch(Paths.appDir, { ignoreInitial: true })
  watcher
    .on('error', console.error)
    .on('add', async (file) => {
      console.info(`File added: ${relative(file)}`)
      await build()
    })
    .on('change', async (file) => {
      console.info(`File changed: ${relative(file)}`)
      await build()
    })
    .on('unlink', async (file) => {
      console.info(`File unlinked: ${relative(file)}`)
      await build()
    })
  return watcher.close
}
