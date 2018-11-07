'use-strict'

const test = require('ava')

let config = {
    logging:function () {}
}

let db = null

test.beforeEach(async () => {
    const setupDatabase = require('../')
    db = await setupDatabase(config)
}) 

test('Agent', t => { // verificacion de que Agent exista
    t.truthy(db.Agent, 'Agent service should exist') // si se resulve el valor a verdadero

})