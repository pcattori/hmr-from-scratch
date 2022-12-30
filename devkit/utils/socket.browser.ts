export { Event } from './socket'

let protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
let host = location.hostname
let port = 3002

export let connect = (onMessage: (data: string) => void) => {
  let ws = new WebSocket(`${protocol}//${host}:${port}/socket`)
  ws.onmessage = (message) => {
    if (typeof message.data !== 'string') {
      throw Error(`Expected socket message data to be a string`)
    }
    onMessage(message.data)
  }
}
