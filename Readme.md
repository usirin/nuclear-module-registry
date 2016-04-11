# nuclear-module-registry

A nuclear module to register your nuclear modules.

### What?

To be able to resolve modules later in other parts of your app use
`nuclear-module-registry` registry to register them upfront.

```js
import { Reactor } from 'nuclear-js'
import { createRecord } from 'nuclear-record'
import { createRegistry } from 'nuclear-module-registry'

const registry = createRegistry(new Reactor)

const config = createRecord({
  env: process.env.NODE_ENV
  port: 3000
}, 'config')

registry.register(config)

// app/some-business-logic.js
import moduleRegistry from 'app/moduleRegistry'

const config = moduleRegistry.make('config')

console.log('Environment: %s, started at port: %s', config.getters.env(), config.getters.port())
```

```sh
> NODE_ENV=dev node app/some-business-logic.js
# => Environment: dev, started at port: 3000
```

# install

```
npm install nuclear-module-registry
```

# licence

MIT

