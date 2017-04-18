import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema({
  name: String,
  description: String,
  epics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
})

const Milestone = mongoose.model('Milestone', milestoneSchema)
export default Milestone
