'use strict'

const util = require('util')
const path = require('path')
const callsite = require('callsite')
const EventEmitter = require('events').EventEmitter

/**
 * @return {string} The caller's directory
 */
const callersDir = () => path.dirname(callsite()[2].getFileName())

/**
 * Dispatches the action by the given paramters.
 * @param {string} action The action name
 * @param {object} argv The parameters for the actions
 * @param {string} [options.actions] The action's directory (relative path)
 * @param {string} [options.base] The action's base directory (absolute path)
 * @return {CliDispatch}
 */
function main (action, argv, options) {
  options = options || {}
  const cli = new CliDispatch(action, options.actions || 'actions', options.base || callersDir())

  setImmediate(() => cli.dispatch(argv))

  return cli
}

/**
 * Looks up the action by the given paramters.
 * @param {string} action The action name
 * @param {string} [options.actions] The action's directory (relative path)
 * @param {string} [options.base] The action's base directory (absolute path)
 * @return {CliDispatch}
 */
function lookup (action, options) {
  options = options || {}
  const cli = new CliDispatch(action, options.actions || 'actions', options.base || callersDir())

  return cli.lookup()
}

/**
 * CliDispatch internal class.
 * @param {string} action The action name
 * @param {string} dir The directory name (relative path)
 * @param {string} baseDir The base directory name (absolute path)
 */
function CliDispatch (action, dir, baseDir) {
  this.action = action
  this.dir = dir
  this.baseDir = baseDir
}

util.inherits(CliDispatch, EventEmitter)

/**
 * Dispatches the action with the given arguments.
 * @param {object} argv The arguments for the action
 */
CliDispatch.prototype.dispatch = function (argv) {
  const action = this.lookup()

  if (action) {
    action(argv)
  }
}

CliDispatch.prototype.lookup = function () {
  let action = null

  try {
    action = require(path.join(this.baseDir, this.dir, this.action))
  } catch (e) {
    this.emit('no-action', this.action)
  }

  return action
}

module.exports = main
module.exports.lookup = lookup
