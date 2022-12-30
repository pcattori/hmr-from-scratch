import WebSocket from 'ws'

import { Event } from './socket'

type Send<E extends Event = Event> = (event: E) => void
export type T<E extends Event = Event> = Send<E>

let createSend = <E extends Event>(
  wss: WebSocket.Server,
): Send<E> => {
  return (event) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(event))
      }
    })
  }
}

export let serve = <E extends Event>(): Send<E> => {
  let wss = new WebSocket.Server({ port: 3002 })
  return createSend<E>(wss)
}
