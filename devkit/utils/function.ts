// function.ts
type AnyFunction = (...args: any[]) => unknown

export let generate = (func: AnyFunction): string => func.toString()

export let parse = (raw: string): AnyFunction => new Function('return ' + raw)()
