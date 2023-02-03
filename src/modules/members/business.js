function business({ validator, db }) {
  const {
    makeGet,
  } = require('./entity')({ validator })

  const {
    getMembers,
    createM
  } = db

  return {
    /**
     * Get members
     * @returns {Object []}
     */
    getMembers: async function (data) {
      const query = makeGet(data)
      const result = await getMembers(query)

      return result
    },

    create: async function () {
      const created = await createM()
      return created
    }
  }
}

module.exports = business