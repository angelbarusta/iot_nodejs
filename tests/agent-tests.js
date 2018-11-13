'use-strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const agentFixtures = require('./fixtures/agent')

let config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()// un spy es un funcion que nos dice datos sobre la funcion, es un chicmoso vamos
}

let single = Object.assign({}, agentFixtures.single)

let connectedArgs = {
  where: {  connected: true }
}

let usernameArgs = {
  where: { username: 'iot', connected: true }
}

let uuidArgs = {
  where: { uuid }
}

let newAgent = {
  uuid: '123-123-123',
  name: 'test',
  username: 'test',
  hostname: 'test',
  pid: 0,
  connected: false
}

let id = 1
let uuid = 'yyy-yyy-yyy'
let AgentStub = null
let db = null
let sandbox = null

let uuidArgs = {
  where: {
    uuid
  }
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  AgentStub = {
    // un sandbox es un ambiente especifico que solo funciona para este caso en particular
    hasMany: sandbox.spy()
  }

  //Model create Stub
  AgentStub.create = sandbox.stub()
  AgentStub.create.withArgs(newAgent).returns(Promise.resolve({
    toJSON () { return newAgent }
  }))

  //Model update Stub
  AgentStub.update = sandbox.stub()
  AgentStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))


   //Modelo findById Stub
   AgentStub.findById = sandbox.stub()
   AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))


  //Model findOne Stub
  AgentStub.findOne = sandbox.stub()
  AgentStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(agentFixtures.byUuid(uuid)))


  //Model findAll Stub 
  AgentStub.findAll = sandbox.stub()
  AgentStub.findAll.withArgs().returns(Promise.resolve(agentFixtures.all))
  AgentStub.findAll.withArgs(connectedArgs).returns(Promise.resolve(agentFixtures.connected))
  AgentStub.findAll.withArgs(usernameArgs).returns(Promise.resolve(agentFixtures.iot))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub, // las mismas rutas que las que estan e declaradas en index.js
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(t => {
  sandbox && sandbox.restore()
})

test('Agent', t => { // verificacion de que Agent exista
  t.truthy(db.Agent, 'Agent service should exist') // si se resulve el valor a verdadero
})


test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany fue ejecutada')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argumento de esa funcion')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo fue ejecutada')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argumentos de esa funcion')
})



test.serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)

  t.true(AgentStub.findById.called, 'findById debera llamar al modelo')
  t.true(AgentStub.findById.calledOnce, 'findById debera ser llamada una vez')
  t.true(AgentStub.findById.calledWith(id), 'findById debera llamar con los argumentos que son')

  t.deepEqual(agent, agentFixtures.byId(id), 'deberia ser el mismo')
})



test.serial('Agent#createOrUpdate - new', async t => {
  let agent = await db.Agent.createOrUpdate(newAgent)

  t.true(AgentStub.findOne.called, 'findOne debera llamar una vez al objeto')
  t.true(AgentStub.findOne.calledOnce, 'findOne debera llamar una vez')
  t.true(AgentStub.findOne.calledWith({
    where: { uuid: newAgent.uuid }
  }), 'findOne debera llamar los argumentos de uuid args')
  t.true(AgentStub.create.called, 'create debera llamar un modelo')
  t.true(AgentStub.create.calledOnce, 'create debera llamarse una vez')
  t.true(AgentStub.create.calledWith(newAgent), 'create debera llamarse con argumentos')

  t.deepEqual(agent. newAgent,'agent debera llamarse solo el mismo')
})



test.serial('Agent#findConnected', async t => {
  let agents = await db.Agent.findConnected()

  t.true(AgentStub.findAll.called, 'findAll debera llamar al modelo')
  t.true(AgentStub.findAll.calledOnce, 'findAll debera ser llamado una sola vez')
  t.true(AgentStub.findAll.calledWith(connectedArgs), 'findAll debera ser llamado con argumentos')

  t.is(agents.length, agentFixtures.connected.length, 'agents deberanser llamado')
  t.deepEqual(agents, agentFixtures.connected, 'agents debera ser el mismo')
})



test.serial('Agent#findAll', async t => {
  let agents = await db.Agent.findAll()

  t.true(AgentStub.findAll.called, 'findAll debera ser llamado')
  t.true(AgentStub.findAll.calledOnce, 'findAll debera ser llamado una sola vez')
  t.true(AgentStub.findAll.calledWith(), 'findAll debera ser llamado con argumentos')

  t.is(agents.length, agentFixtures.all.length, 'agents deberan ser los mismos')
  t.deepEqual(agents,agentFixtures.all, 'agents deberan ser los mismos')
})



test.serial('Agent#findByUsername', async t => {
  let agents = await db.Agent.findByUsername('iot')

  t.true(AgentStub-findAll.called, 'findAll debera llamar el modelo')
  t.true(AgentStub.findAll.calledOnce, 'findAll debera ser llamado una sola vez')
  t.true(AgentStub.findAll.calledWith(usernameArgs), 'findAll debera ser llamado con argumentos')

  t.is(agents.length, agentFixtures.iot.length, 'agents deneran ser los mismos')
  t.deepEqual(agents,agentFixtures.iot, 'agents deberan ser los mismos')
})



test.serial('Agent#createOrUpdate - exists', async t => {
  let agent = await db.Agent.createOrUpdate(single)

  t.true(AgentStub.findOne.called,'findOne debera llamar al modelo')
  t.true(AgentStub.findOne.calledTwice, 'findOne debera llamar dos veces')
  t.true(AgentStub.update.calledOnce, 'update debera ser llamado una sola vez')

  t.deepEqual(agent,  single, 'el agent deberia ser el mismo')
})
