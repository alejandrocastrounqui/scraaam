const EpicTask = function(mapper){
  return {
    name: 'EpicTask',
    mapping:{
      description:  mapper.string(),
      epic:         mapper.belongsTo('Epic', 'tasks')
    }
  }
}

export default EpicTask
