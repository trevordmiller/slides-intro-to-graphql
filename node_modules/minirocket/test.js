const test = require('tape')
const logger = require('./test/fixture/logger')
const fixtureMinirocket = require('./test/fixture/minirocket')

test('it calls the callback with the action of the first truthy key', t => {
  t.plan(1)

  logger.log = msg => {
    t.equal(msg, 'Hello, John!')
  }

  fixtureMinirocket({foo: false, bar: true}, action => action({name: 'John'}))
})

test('it throws if the action definition is not an object', t => {
  t.plan(1)

  t.throws(() => {
    fixtureMinirocket('', () => {})
  })
})

test('it throws if any of the action definition is not selected', t => {
  t.plan(1)

  t.throws(() => {
    fixtureMinirocket({foo: false, bar: false}, () => {})
  })
})

test('it emits `no-action` event if the given selected action is not available in actions directory', t => {
  t.plan(1)

  const minirocket = fixtureMinirocket({foo: false, bar: false, spam: true}, () => {})

  minirocket.on('no-action', action => {
    t.equal(action, 'spam')
  })
})

test('`options` parameter can be null', t => {
  t.plan(1)

  fixtureMinirocket({foo: true}, null, () => {
    t.ok(true)
  })
})
