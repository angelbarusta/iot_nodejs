'use strict'

const debug = require('debug')('iot_nodejs:db:setup')
const db = require('./')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'az_movil',
    username: process.env.DB_USER || 'iot',
    password: process.env.DB_PASS || '123456789',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true,
    operatorsAliases: false

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
