import path from 'node:path'

let rootDir = path.resolve(__dirname, '../..')

export let appDir = path.join(rootDir, 'app')
export let entrypoint = path.join(appDir, 'index.ts')
export let publicDir = path.join(rootDir, 'public')
export let buildDir = path.join(publicDir, 'build')
export let bundle = path.join(buildDir, 'bundle.js')
