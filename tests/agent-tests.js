'use-strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()// un spy es un funcion que nos dice datos sobre la funcion, es un chicmoso vamos
}

let AgentStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox

  AgentStub = {
    // un sandbox es un ambiente especifico que solo funciona para este caso en particular
    hasMany: sandbox.spy()
  }

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub, // las mismas rutas que las que estan e declaradas en index.js
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('Agent', t => { // verificacion de que Agent exista
  t.truthy(db.Agent, 'Agent service should exist') // si se resulve el valor a verdadero
})
test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany fue ejecutada')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argumento de esa funcion')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo fue ejecutada')
})
