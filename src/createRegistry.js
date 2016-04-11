import { createModule } from 'nuclear-module'
import { createRecord } from 'nuclear-record'
import { Map } from 'immutable'
import assign from 'lodash.assign'

/**
 * Creates a module registry for given reactor.
 *
 * @public
 * @param {NuclearModuleReactor} reactor
 * @returns {EnhancdNuclearModuleRegistry}
 */
export default function createRegistry(reactor) {
  const config = {
    modules: Map({})
  }

  const registry = createRecord(config, 'NuclearModuleRegistry')(reactor)

  return enhanceRegistry(registry, reactor)
}

/**
 * Attaches functions to registry module.
 *
 * @public
 * @param {NuclearModuleRegistry} registry
 * @param {NuclearModuleReactor} reactor
 * @returns {EnhancedNuclearModuleRegistry}
 */
function enhanceRegistry(registry, reactor) {

  const enhancor = {
    /**
     * Register a module to registry.
     *
     * @public
     * @param {NuclearModule} Module
     */
    register(Module) {
      const pickModule = modules => modules.filter(m => m.name === Module.getName())

      let modules = registry.getters.modules()
      const registeredModules = pickModule(modules)

      if (registeredModules.size) {
        return registeredModules.toList().get(0)
      }

      const module = Module(reactor)

      modules = modules.set(module.name, module)

      registry.actions.set('modules', modules)
    },

    /**
     * Resolve a module from registry.
     *
     * @public
     * @param {String} name
     * @returns {NuclearModule}
     */
    make(name) {
      return registry.getters.modules(modules => modules.get(name))
    }
  }

  return assign({}, registry, enhancor)
}

