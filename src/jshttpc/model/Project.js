
const Project = function(mapper){
  return {
    name: 'Project',
    mapping:{
      name:        mapper.string(),
      description: mapper.string(),
      miestones:   mapper.hasMany('Milestone')
    }
  }
}

export default Project
