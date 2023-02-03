require('dotenv/config')

/** ENV vars */
const {
  PORT,
  DB_CONNECTION,
  NODE_ENV,
} = process.env

/** Dependencies */
const { 
  app,
  mongoose,
} = require('./src/app')


const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

app.use(express.json())
app.use(cors())
app.use(helmet())
if (NODE_ENV !== undefined) app.set('trust proxy', 1)

/** Database */
mongoose.set('strictQuery', true)

mongoose
  .connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to db')

    app.listen(PORT, () => console.log('Server is up at', PORT))

  })
  .catch((err) => {
    if (err.code === 'ETIMEOUT') console.log('DB connection timeout.')
    else if (typeof err === mongoose.Error.MongooseServerSelectionError) console.log('Could not connect to any servers in your MongoDB Atlas cluster ..')
    else console.log('Error (DB connection):', err)
  })

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Disconnected from db')
    process.exit(0)
  })
})
