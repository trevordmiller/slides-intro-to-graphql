const EventEmitter = require('events').EventEmitter

/**
 * @param {Object} object The object
 * @param {Object} config The config
 * @return {EventEmitter}
 */
exports.select = (object, config) => {
  const ee = new EventEmitter()

  setImmediate(() => {
    // The action name candidate
    const name = Object.keys(config).find(key => config[key])

    if (!name) { return ee.emit('no-action', name) }

    // The action candidate
    const action = object[`action:${name}`]

    if (action) {
      ee.emit('action', action)
    } else {
      ee.emit('no-action', name)
    }
  })

  return ee
}
