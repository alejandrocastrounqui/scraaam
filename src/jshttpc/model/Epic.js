const Epic = function(mapper){
  return {
    name: 'Epic',
    mapping:{
      name:        mapper.string(),
      description: mapper.string(),
      tasks:       mapper.hasMany('EpicTask', { as: 'epic' }),
      comments:    mapper.hasMany('EpicComment', { as: 'epic' }),
      milestone:   mapper.belongsTo('Milestone', 'epics')
    }
  }
}

export default Epic
