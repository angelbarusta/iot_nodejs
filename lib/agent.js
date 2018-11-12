'use strict'

module.exports = function setupAgent (AgentModel) {
  function findById (id) {
    return AgentModel.findById(id)// si se modifica el 'id' por x motivo la prueba fallara
  }
  

  return {
    findById
  }
}
