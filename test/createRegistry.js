import expect from 'expect'
import { Reactor } from 'nuclear-js'
import { createRecord } from 'nuclear-record'

import createRegistry from '../src/createRegistry'

describe('createRegistry()', () => {
  it('creates a registry', () => {
    const registry = createRegistry(new Reactor)

    expect(registry).toExist()
  })

  it('registers a module', () => {
    const registry = createRegistry(new Reactor)
    const FooRecord = createRecord({
      foo: ''
    }, 'FooRecord')

    registry.register(FooRecord)

    expect(registry.getters.modules(modules => modules.has('FooRecord'))).toBe(true)
  })

  it("doesn't register same module twice", () => {
    const registry = createRegistry(new Reactor)
    const FooRecord = createRecord({
      foo: ''
    }, 'FooRecord')

    const fooRecord = (modules => modules.get('FooRecord'))
    registry.register(FooRecord)
    const firstRecord = registry.getters.modules(fooRecord)

    registry.register(FooRecord)
    const secondRecord = registry.getters.modules(fooRecord)

    expect(firstRecord).toBe(secondRecord)
  })

  it('makes a registered module', () => {
    const registry = createRegistry(new Reactor)
    const FooRecord = createRecord({
      foo: ''
    }, 'FooRecord')

    registry.register(FooRecord)
    const fooRecord = registry.make('FooRecord')

    expect(fooRecord.getters.foo()).toBe('')
  })
})


