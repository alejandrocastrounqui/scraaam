
const Project = function(mapper){
  return {
    name: 'Project',
    mapping:{
      name:        mapper.string(),
      description: mapper.string(),
      milestones:  mapper.hasMany('Milestone', {as: 'project'})
    }
  }
}

export default Project
