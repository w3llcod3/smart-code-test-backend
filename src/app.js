require('dotenv/config')

/** Dependencies */
const express = require('express')
const mongoose = require('mongoose')
const validator = require('joi')
const responseFormatter = require('./utils/responseFormatter')
const { queryParser } = require('express-query-parser')
const cors = require('cors')
const helmet = require('helmet')

/** Models */
const { Member } = require('./modules/members/model')({ mongoose })
const { Absence } = require('./modules/absences/model')({ mongoose })

/** App */
const app = express()
app.use(express.json())
app.use(queryParser({
  parseNull: true,
  parseUndefined: true,
  parseBoolean: true,
  parseNumber: true
}))

app.use(cors())
app.use(helmet())
app.use(require('./modules/members')({ responseFormatter, Member, validator }))
app.use(require('./modules/absences')({ responseFormatter, Absence, validator }))

module.exports = {
  app,
  mongoose,
}