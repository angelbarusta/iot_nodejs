'use strict'

const agent = {
  id: 1,
  uuid: 'yyy-yyy-yyy',
  name: 'fixture',
  username: 'iot',
  hostname: 'test-host',
  pid: 0,
  connected: true,
  createdAt: new Date(), // fecha de craciom
  updatedAt: new Date()// fecha de actualizacion
}

const agents = [
  agent,
  extend(agent, { id: 2, uuid: 'yyy-yyy-yyw', connected: false, username: 'test' }),
  extend(agent, { id: 3, uuid: 'yyy-yyy-yyx,' }),
  extend(agent, { id: 4, uuid: 'yyy-yyy-yyz', username: 'test' })
]

function extend (obj, values) { // funcion para sobre escribir un objeto
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: agent, // filtros
  all: agents, // filtros
  connected: agents.filter(a => a.connected),
  iot: agents.filter(a => a.username === 'iot'), // para filtrar por usuario
  byUuid: id => agents.filter(a => a.uuid === id).shift(), // para filtrar por uuid
  byId: id => agents.filter(a => a.id === id).shift()// para filtrar por id

}
// primero abrir en terminal: node
// despues >var agentFixtures = require('./tests/fixtures/agent')
// despues >agentFixtures.single;
// > agentFixtures.byId(1)
