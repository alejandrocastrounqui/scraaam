import express from 'express'
import bodyParser from 'body-parser'

// Connects to mongoose
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/news')

// Express configuration
const app = express()
app.use(bodyParser.json())

app.use(express.static(__dirname + "/../../dist/frontend"))

import routes from './routes/routes.js'
app.use(routes)

// Express startup
const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
