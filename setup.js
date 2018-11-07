'use strict'

const debug = require('debug')('iot_nodejs:db:setup')
const inquirer = require('inquirer')// instalacion de inquirer y chalk mediante "npm i inquirer chalk --save"
const chalk = require('chalk') // chalk agrega un color al mensaje de error que salga
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  //Realizacion de la pregunta previa que solicita permiso para continuar
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'Esto va a destruir la base de datos, esta seguro de continuar?'
    }
  ])

  if (!answer.setup){// si la pregunta es contestada como falsa
    return console.log('No pasa nada :) i love you bb')
  }


  const config = {
    database: process.env.DB_NAME || 'az_movil', // aqui se cambia por el nombre de la base de datos que le quieras poner
    username: process.env.DB_USER || 'iot', // tu nombre de usuario
    password: process.env.DB_PASS || '123456789', // tu contraseña
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
  console.error(`${chalk.red('[Error fatal]')} ${err.message}`)// aqui se elige el color del chalk, en este caso RED
  console.error(err.stack)
  process.exit(1)
}

setup()
