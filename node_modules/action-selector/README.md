# action-selector v1.0.1

[![CircleCI](https://circleci.com/gh/kt3k/action-selector.svg?style=svg)](https://circleci.com/gh/kt3k/action-selector)
[![codecov](https://codecov.io/gh/kt3k/action-selector/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/action-selector)

> Select actions from the given configuration

# Install

    npm install action-selector

# Usage

See the example below:

```js
const { select } = require('action-selector')
const argv = require('minimist')(process.argv.slice(2))

const actions = {
  'action:help': () => showHelpMessage(),
  'action:version': () => showVersionNumber(),
  'action:build': () => buildSomething(),
}

select(actions, {
  help: argv.help || argv._[0] === 'help',
  version: argv.version || argv._[0] === 'version',
  [argv._[0]]: true,
})
.on('action', action => action(argv))
.on('no-action', name => console.log(`No such action: ${name}`))
```

With the above example, the command maps like the below:

```
node command.js --help    # => help action
node command.js help      # => help action
node command.js --version # => version action
node command.js version   # => version action
node command.js build     # => build action
node command.js explode   # => No such action: explode
```

# API

```js
const { select } = require('action-selector')
```

## select(object, config)

- @param {Object} object The object from which the selector look up the action
- @param {Object} config The config by which the selector look up the action
- @return {EventEmitter}

The selector look up the function in `object`.

The rule is:
- Checks each key of `config` from the top
- The first key which has truthy value in `config` is the name of the chosen `action`.
- Then check `action:${actionName}` key in `object`.
- If `action:${actionName}` exists in `object` then that is the action and emits `action` event with it.
- If `action:${actionName}` doesn't exist in `object` then emits `no-action` event with the missing action's name.

# History

- 2017-06-19   v1.0.1   Support node.js v4.


# License

MIT
