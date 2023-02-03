function Model({ mongoose }) {

  const schema = mongoose.Schema({
    _id: { type: Number, default: 0 },
    userId: { type: Number, default: 0 },
    crewId: { type: Number, default: 0 },
    image: { type: String, default: null },
    name: { type: String, default: null },
  })

  return {
    Member: mongoose.model('Member', schema)
  }
}

module.exports = Model