const lookup = require('cli-dispatch').lookup
const callsite = require('callsite')
const EventEmitter = require('events').EventEmitter
const path = require('path')
const util = require('util')

const callersDir = () => path.dirname(callsite()[2].getFileName())

function Minirocket () {
  EventEmitter.call(this)
}

util.inherits(Minirocket, EventEmitter)

/**
 * @param {object} actionDefinition The action definition
 * @param {object} [options] The options
 * @param {Function} callback The callback of launch
 * @return {Minirocket}
 */
module.exports = (actionDefinition, options, callback) => {
  if (typeof options === 'function' && callback == null) {
    callback = options
    options = {}
  }

  options = options || {}

  const minirocket = new Minirocket()

  if (typeof actionDefinition !== 'object') {
    throw new Error('actionDefinition have to be an object')
  }

  const action = Object.keys(actionDefinition).filter(key => actionDefinition[key])[0]

  if (!action) {
    throw new Error('No action is available: ' + Object.keys(actionDefinition))
  }

  const actionFunc = lookup(action, {actions: options.actions, base: callersDir()})

  setTimeout(() => actionFunc ? callback(actionFunc) : minirocket.emit('no-action', action))

  return minirocket
}
