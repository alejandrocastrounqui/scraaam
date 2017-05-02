const Milestone = function(mapper){
  return {
    name: 'Milestone',
    mapping:{
      name:        mapper.string(),
      description: mapper.string(),
      epics:       mapper.hasMany('Epic'),
      project:     mapper.belongsTo('Project', 'milestones')
    }
  }
}

export default Milestone
