function db({ Member }) {

  return {
    /**
     * Get members
     * @param {String} query 
     * @returns {Object}
     */
    getMembers: async function ({ query, offset, limit, ...args }) {
      if (Object.keys(args).length) throw { name: 'invalidArgs' }

      const [total, items] = await Promise.all([
        Member.countDocuments(query),
        Member.find(query)
          .skip(offset)
          .limit(limit)
          .lean()
      ])

      return { items, total }
    },

    createM: async function () {
      const c = await Member.create({
        _id: 999,
        userId: 123,
        crewId: 123,
        image: 'some image',
        name: 'Joe'
      })

      return c
    }
  }
}

module.exports = db