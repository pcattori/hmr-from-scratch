import * as Socket from '../utils/socket.browser'

Socket.connect((data) => {
  let event = JSON.parse(data) as Socket.Event
  if (event.type === 'reload') {
    console.log('Reloading...')
    window.location.reload()
  }
})
