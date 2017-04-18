import express from 'express'

import Project from '../models/Project.js'
import Milestone from '../models/Milestone.js'

let project = express.Router()

// Express routes
project.param('projectId', (req, res, next, projectId) => {
  Project.findById(projectId)
    .then(project => {
      if (! project ) {
        throw new Error(`project id:${projectId} not found`)
      }
      req.project = project
      next()
    })
    .catch(next)
})

project.get('/project', (req, res, next) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(next)
})

project.post('/project', (req, res, next) => {
  const newProject = new Project(req.body)
  newProject.save()
    .then(project => res.json(project.id))
    .catch(next)
})

project.get('/project/:projectId', (req, res, next) => res.json(req.project))

project.put('/project/:projectId/milestones', (req, res, next) => {
  if(typeof req.body != 'object' || !Array.isArray(req.body)){
    throw new Error(`milestones exptected`)
  }
  const milestonesPromises = req.body.map(milestone => {
    const milestonesEntitiy = new Milestone(milestone)
    milestonesEntitiy.project = req.project
    return milestonesEntitiy.save()
  })
  Promise.all(milestonesPromises)
    .then(milestoneEntities => {
      milestoneEntities.forEach(milestoneEntity => {
        req.project.milestones.push(milestoneEntity)
      })
      req.project.save()
        .then(project => {
          res.json(milestoneEntities.map(milestone => milestone.id))
        })
        .catch(next)
    })
    .catch(next)
})


export default project
