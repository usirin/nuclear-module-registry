import expect from 'expect'
import {Reactor} from 'nuclear-js'

import NuclearModuleRegistry from '../src'

describe('NuclearModuleRegistry', () => {
  it('should create a registry', () => {
    const registry = NuclearModuleRegistry.createRegistry(new Reactor)

    expect(registry).toExist()
  })
})
