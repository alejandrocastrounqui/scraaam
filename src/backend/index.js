import express from 'express'
import bodyParser from 'body-parser'

// Connects to mongoose
import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/news')

// Express configuration
const app = express()
app.use(bodyParser.json())

app.use(express.static(__dirname + "/../../dist/frontend"))

import noticias from './routes/noticias.js'
app.use(noticias)

import project from './routes/project.js'
app.use(project)

import milestone from './routes/milestone.js'
app.use(milestone)

import epic from './routes/epic.js'
app.use(epic)

// Express startup
const port = 3001
app.listen(port, () => console.log(`Server running on port ${port}`))
