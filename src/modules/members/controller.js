function controller({ responseFormatter, Member, validator }) {

  const db = require('./db')({ Member })
  const {
    getMembers,
    create,
  } = require('./business')({ validator, db })

  function handleExceptions(err) {
    let message, details, code

    switch (err.name) {
      case 'CastError':
        code = 400
        message = 'Bad or missing _id'
        break
      case 'dataValidationError':
        message = 'Data validation error(s).'
        code = 422
        details = err.details
        break
      case 'notFound':
        message = 'Not found'
        code = 400
        break
      case 'ValidationError':
        console.log(err)
        message = 'Error in server validation'
        code = 500
        break
      case 'invalidArgs':
        console.log(err)
        message = 'Error in server args'
        code = 500
        break
      default:
        code = 500
        console.log(err)
        break
    }

    return { message, details, code }
  }

  return {
    /**
     * Get members
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getMembers: async function (req, res) {
      let successResult, failureMessage = null, failureResult, status = 200

      try {
        successResult = await getMembers(req.query)
      } catch (err) {
        ({ message: failureMessage, details: failureResult, code: status } = handleExceptions(err))
      }

      return res.status(status).json(responseFormatter({ status, successResult, failureMessage, failureResult }))
    },

    /**
     * Get members
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    create: async function (req, res) {
      let successResult, failureMessage = null, failureResult, status = 200

      try {
        successResult = await create(req.query)
      } catch (err) {
        ({ message: failureMessage, details: failureResult, code: status } = handleExceptions(err))
      }

      return res.status(status).json(responseFormatter({ status, successResult, failureMessage, failureResult }))
    },
  }
}

module.exports = controller
