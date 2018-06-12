const select = require('./').select
const expect = require('chai').expect

describe('select()', () => {
  it('emits action event when the action is available', done => {
    const obj = {
      'action:foo'() {}
    }

    const config = { foo: true }

    select(obj, config).on('action', action => {
      expect(action).to.equal(obj['action:foo'])
      done()
    })
  })

  it('emits no-action event with the candidate action name when the action is unavailable', done => {
    const obj = {
      'action:bar'() {}
    }

    const config = { foo: true }

    select(obj, config).on('no-action', name => {
      expect(name).to.equal('foo')
      done()
    })
  })

  it('emits no-action event with undefined when the config values are all falthy', () => {
    const obj = {
      'action:bar'() {}
    }

    const config = { bar: false }

    select(obj, config).on('no-action', name => {
      expect(name).to.equal(undefined)
      done()
    })
  })
})
