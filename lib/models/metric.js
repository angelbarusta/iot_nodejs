'use strict'

const Sequelize =require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupMetricModel (config) {
    const sequelize = setupDatabase(config)

    return sequelize.define('metric', {
        //-------- aqui van las propiedades------------
        type: {  // nombre de la propiedad
            type: Sequelize.STRING, // tipo
            allowNull: false
        },
        value: { // nombre de la propiedad
            type: Sequelize.TEXT,// tipo
            allowNull: false
        }
        //---------------------------------------------
    })
}
// antes de correrlo verificar que no exista ningun error con "npm run lint"