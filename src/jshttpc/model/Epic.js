const Epic = function(mapper){
  return {
    name: 'Epic',
    mapping:{
      name:        mapper.string(),
      description: mapper.string(),
      tasks:       mapper.hasMany('EpicTask'),
      comments:    mapper.hasMany('EpicComment'),
      milestone:   mapper.belongsTo('Milestone', 'epics')
    }
  }
}

export default Epic
