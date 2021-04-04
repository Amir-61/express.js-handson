const express = require('express')
const logger = require('./middlewares/logger')
const courses = require('./routes/courses')

const app = express()

app.use(express.json())
app.use(logger)

app.use('/api/courses/', courses)


const port = process.env.PORT || 3000
app.listen(port,() => console.log(`Listening on port ${port}`))