import mongoose from 'mongoose'

const epicSchema = new mongoose.Schema({
  description: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EpicTask' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EpicComment' }],
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }
})

const Epic = mongoose.model('Epic', epicSchema)
export default Epic
