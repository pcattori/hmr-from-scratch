import express from 'express'
import morgan from 'morgan'

import { build } from './build'

let port = 3001

export let serve = async () => {
  let app = express()
  app.use(morgan('dev'))
  app.use('/', express.static('public'))
  app.get('/bundle.js', async (_req, res) => {
    let bundle = await build()
    res.set('Content-Type', 'text/javascript')
    res.send(Buffer.from(bundle))
  })
  app.listen(port, () => console.log(`Server listening on port ${port}`))
}
