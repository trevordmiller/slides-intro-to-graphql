const dispatch = require('./')
const lookup = dispatch.lookup
const fixtureDispatch = require('./test/fixture/dispatch')
const logger = require('./test/fixture/logger')
const test = require('tape')

test('it dispatches the given action by the given name', t => {
  t.plan(1)

  logger.log = msg => {
    t.equal('foo!', msg)
  }

  fixtureDispatch('foo', {})
})

test('it passes the argv to the action', t => {
  t.plan(1)

  logger.log = msg => {
    t.equal(msg, 'Hello, John!')
  }

  fixtureDispatch('bar', {name: 'John'})
})

test('it emits the no-action event when the action is not found', t => {
  t.plan(1)

  fixtureDispatch('baz', {}).on('no-action', name => {
    t.equal(name, 'baz')
  })
})

test('it uses the given actions options to look for the action file', t => {
  t.plan(1)

  logger.log = msg => {
    t.equal('foo!', msg)
  }

  dispatch('foo', {}, {actions: 'test/fixture/actions'})
})

test('lookup method looks up the given action', t => {
  t.plan(2)

  logger.log = msg => {
    t.equal('foo!', msg)
  }

  const action = lookup('foo', {actions: 'test/fixture/actions'})

  t.ok(typeof action === 'function', 'The returned value is a function.')

  action()
})
