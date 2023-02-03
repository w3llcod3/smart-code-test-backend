function Model({ mongoose }) {

  const schema = mongoose.Schema({
    _id: { type: Number, default: null },
    type: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
    admitterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
    admitterNote: { type: String, default: null },
    memberNote: { type: String, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    crewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
    createdAt: { type: Date, default: null },
    confirmedAt: { type: Date, default: null },
    rejectedAt: { type: Date, default: null },
  })

  return {
    Absence: mongoose.model('Absence', schema)
  }
}

module.exports = Model