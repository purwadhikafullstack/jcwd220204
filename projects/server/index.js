const express = require('express')
const dotenv = require('dotenv')
const db = require('./models')

const PORT = 2000

const app = express()

app.use(express.json())

app.listen(PORT, () => {
  db.sequelize.sync({ alter: true })
  console.log('Listening in port', PORT)
})
