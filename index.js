'use strict'


const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {

    const sequelize = setupDatabase(config)
    const AgentModel = setupAgentModel(config)
    const MetricModel = setupMetricModel(config)
// definimos relacion agtente y metricas
    AgentModel.hasMany(MetricModel)
    MetricModel.belongsTo(AgentModel)
// espera hasta que si se conecte adecuadamente
   await sequelize.authenticate()

// configuracion de la base de datos
   sequelize.sync()



    const Agent ={}
    const Metric = {}

    return {
        Agent,
        Metric
    }
}