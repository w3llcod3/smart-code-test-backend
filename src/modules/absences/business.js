function business({ validator, db }) {
  const {
    makeGet,
  } = require('./entity')({ validator })

  const {
    getAbsences,
  } = db

  return {
    /**
     * Get members
     * @returns {Object []}
     */
    getAbsences: async function (data) {
      const query = makeGet(data)
      const result = await getAbsences(query)

      return result
    },
  }
}

module.exports = business