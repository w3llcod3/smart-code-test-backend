function controller({ responseFormatter, Absence, validator }) {

  const db = require('./db')({ Absence })
  const {
    getAbsences,
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
     * Get absences
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getAbsences: async function (req, res) {
      let successResult, failureMessage = null, failureResult, status = 200

      try {
        successResult = await getAbsences(req.query)
      } catch (err) {
        ({ message: failureMessage, details: failureResult, code: status } = handleExceptions(err))
      }

      return res.status(status).json(responseFormatter({ status, successResult, failureMessage, failureResult }))
    },
  }
}

module.exports = controller
