import express from 'express'
import morgan from 'morgan'

let port = 3001

export let serve = async () => {
  let app = express()
  app.use(morgan('dev'))
  app.use('/', express.static('public'))
  app.use('/', express.static('public/build'))
  app.listen(port, () => console.log(`Server listening on port ${port}`))
}
