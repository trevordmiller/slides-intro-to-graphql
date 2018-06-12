# cli-dispatch v1.3.0

[![CircleCI](https://circleci.com/gh/kt3k/cli-dispatch.svg?style=svg)](https://circleci.com/gh/kt3k/cli-dispatch)
[![codecov](https://codecov.io/gh/kt3k/cli-dispatch/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/cli-dispatch)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Dispatches or looks up actions in a direactory from the given parameters.

# Install

    npm install cli-dispatch

# Usage

First you need to set up the main script and `actions/` directoty in the following structure:

```
bin/
├── main.js
└── actions
    ├── version.js
    ├── foo.js
    └── bar.js
```

In main.js:

```js
const dispatch = require('cli-dispatch')
const minimisted = require('minimisted')

minimisted(function ({_: [action], v, version}) {
  if (v || version) {
    action = 'version'
  }

  dispatch(action, arguments[0]).on('no-action', () => {
    console.log(`No such action: ${action}`)
    process.exit(1)
  })
})
```

actions/version.js
```js
module.exports = () => console.log('my-command v1.0.0')
```

actions/foo.js
```js
module.exports = () => console.log('foo!')
```

actions/bar.js
```js
module.exports = argv => console.log(`Hello, ${argv.name}!`)
```

Then, main.js works as the following:

    $ node main.js -v
    my-command v1.0.0
    $ node main.js foo
    foo!
    $ node main.js bar --name John
    Hello, John!
    $ node main.js baz
    No such action: baz

# API

```js
const dispatch = require('cli-dispatch')
```

## dispatch(action, argv, options)

- @param {string} action The name of the action
- @param {object} argv The arguments which is passed to
- @param {object} options The options
- @param {string} [options.actions] The directory where this function look for the actions. Default is `[the caller's directory]/actions`. For example, if your main.js is in `/foo/bar` and you call dispatch in main.js, then it look for the actions under `/foo/bar/actions`
- @return {CliDispatch} custom object

This dispatches the action by the given action name and returns the custom CliDispatch class instance. If the action file is not found, then the instance emits the `no-action` event.

`argv` is passed to the action function. 

## lookup(action, options)

- @param {string} action The name of the action
- @param {object} options The options
- @param {string} [options.actions] The directory where this function look for the actions. Default is `[the caller's directory]/actions`. For example, if your main.js is in `/foo/bar` and you call dispatch in main.js, then it look for the actions under `/foo/bar/actions`

This looks up the action function by the given action name and returns that function.

# License

MIT
