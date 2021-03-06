/* globals Prism */

import {expect} from 'chai'
import sinon from 'sinon'
import {afterEach, beforeEach, describe, it} from 'mocha'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('frost-demo-editor',
  [
    'component:ivy-codemirror',
    'component:markdown-to-html',
    'component:frost-file-explorer',
    'component:frost-file-node',
    'component:frost-icon',
    'helper:not',
    'helper:and'
  ]
)
describe(test.label, function () {
  test.setup()

  let component, sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    sandbox.spy(Prism, 'highlightAll')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('computed propety codeClass', function () {
    it('computed property codeClass returns active when showCode is true', function () {
      component = this.subject({
        path: 'fullscreen',
        showCode: true
      })

      expect(component.get('codeClass')).to.equal('active')
    })

    it('computed property codeClass returns active when showCode is false', function () {
      component = this.subject({
        path: 'fullscreen',
        showCode: false
      })

      expect(component.get('codeClass')).to.equal('')
    })
  })

  describe('computed property docClass', function () {
    it('computed property docClass returns active when showCode is not true', function () {
      component = this.subject({
        path: 'fullscreen',
        showCode: false
      })

      expect(component.get('docClass')).to.equal('active')
    })

    it('computed property docClass returns active when showCode is true', function () {
      component = this.subject({
        path: 'fullscreen',
        showCode: true
      })

      expect(component.get('docClass')).to.equal('')
    })
  })

  describe('afterRender', function () {
    beforeEach(function () {
      component = this.subject({
        path: 'fullscreen',
        showCode: false
      })
      this.render()
    })

    it('calls Prism.highlightAll', function () {
      expect(Prism.highlightAll).to.have.been.called
    })

    // FIXME: get test passing again (MRD - 2017-01-10)
    it.skip('sets up click events for the ribbon capsules', function (done) {
      this.$('.ribbon .code').click()
      Ember.run(() => {
        expect(component.get('showCode')).to.equal(true)
        done()
      })
    })
  })
})
