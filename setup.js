'use strict'

const debug = require('debug')('iot_nodejs:db:setup')
const db = require('../lib/db')


async function setup () {
  const config = {
    database: process.env.DB_NAME || 'iot_nodejs',
    username: process.env.DB_USER || 'IOT_NODEJS',
    password: process.env.DB_PASS || 'IOT_NODEJS',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true,
   
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()