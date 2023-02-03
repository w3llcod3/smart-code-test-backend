function entity({ validator }) {
  return {
    /**
     * Get menu node
     * @param {Object} data 
     * @returns {Object}
     */
    makeGet: function (data) {
      const schema = validator.object({
        offset: validator.number().integer().min(0).required(),
        limit: validator.number().integer().min(5).max(20).required(),
        _id: validator.string(),
      })

      const { value, error } = schema.validate(data, { abortEarly: false })
      if (error) throw { name: 'dataValidationError', details: error.details }

      const { _id, offset, limit } = value

      return Object.freeze({
        offset,
        limit,
        query: {
          ..._id !== undefined && { _id },
        }
      })
    },
  }
}

module.exports = entity