import * as Function from '../utils/function'
import { Module } from './module'

export type T = Module
export type Exports = Record<string, unknown>
export type Require = (source: string) => Exports

type ModuleFunction = (require: Require) => Exports
export let asFunction = ({ code }: Module): ModuleFunction => {
  let wrap = [
    'function (require) {',
    'let module = { exports: {}}',
    code,
    'return module.exports',
    '}',
  ].join('\n')
  return Function.parse(wrap) as ModuleFunction
}
