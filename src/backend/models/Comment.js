import mongoose from 'mongoose'

// Mongoose models and schemas
const commentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
