import express from 'express'
import bodyParser from 'body-parser'


// Connects to mongoose
import mongoose from 'mongoose'
mongoose.Promise = global.Promise;

import mappings from './mappings'

const app = express()
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../../dist/frontend'))

app.use(mappings.router)

export default app
