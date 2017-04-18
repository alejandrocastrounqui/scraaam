import mongoose from 'mongoose'

const epicTaskSchema = new mongoose.Schema({
  description: String,
  epic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }]
})

const EpicTask = mongoose.model('EpicTask', epicTaskSchema)
export default EpicTask
