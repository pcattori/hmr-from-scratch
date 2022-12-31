import { Module } from './module'

export type Add = {
  type: 'hmr/add'
  id: string
  mod: Module
}

export type Change = {
  type: 'hmr/change'
  id: string
  mod: Module
}

export type Delete = {
  type: 'hmr/delete'
  id: string
}

export type Event = Add | Change | Delete
