function routes({ responseFormatter, Member, validator }) {
  const router = require('express').Router()
  const {
    getMembers,
    create,
  } = require('./controller')({ responseFormatter, Member, validator })

  router.get('/api/members/v1', getMembers)
  router.post('/api/members/v1', create)

  return router
}

module.exports = routes