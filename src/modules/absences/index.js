function routes({ responseFormatter, Absence, validator }) {
  const router = require('express').Router()
  const {
    getAbsences
  } = require('./controller')({ responseFormatter, Absence, validator })

  router.get('/api/absences/v1', getAbsences)

  return router
}

module.exports = routes