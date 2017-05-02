const Comment = function(mapper){
  return {
    name: 'EpicComment',
    mapping:{
      body:      mapper.string(),
      author:    mapper.string(),
      createdAt: mapper.date('now'),
      epic:      mapper.belongsTo('Epic', 'comments')
    }
  }
}

export default Comment
