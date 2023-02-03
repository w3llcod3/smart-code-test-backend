function db({ Absence }) {
  return {
    /**
     * Get absences
     * @param {String} query 
     * @returns {Object}
     */
    getAbsences: async function ({ query, offset, limit, ...args }) {
      if (Object.keys(args).length) throw { name: 'invalidArgs' }

      const [total, items] = await Promise.all([
        Absence.countDocuments(query),
        Absence.find(query)
          .skip(offset)
          .limit(limit)
          .populate({ path: 'userId', select: 'name image id' })
          .sort({ createdAt: -1 })
          .lean()
      ])

      return { total, items }
    },
  }
}

module.exports = db