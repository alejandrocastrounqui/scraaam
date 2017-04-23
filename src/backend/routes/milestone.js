import express from 'express'

import Epic from '../models/Epic.js'
import Milestone from '../models/Milestone.js'

let milestone = express.Router()

// Express routes
milestone.param('milestoneId', (req, res, next, milestoneId) => {
  Milestone.findById(milestoneId)
    .then(milestone => {
      if (! milestone ) {
        throw new Error(`milestone id:${milestoneId} not found`)
      }
      req.milestone = milestone
      next()
    })
    .catch(next)
})

milestone.get('/milestone', (req, res, next) => {
  Milestone.find()
    .then(milestones => res.json(milestones))
    .catch(next)
})

//TODO: hacer el update parcial
milestone.patch('/milestone/:milestoneId', (req, res, next) => {
  const newMilestone = new Milestone(req.body)
  newMilestone.save()
    .then(milestone => res.json(milestone.id))
    .catch(next)
})

milestone.get('/milestone/:milestoneId', (req, res, next) => res.json(req.milestone))

milestone.get('/milestone/:milestoneId/epics', (req, res, next) => {
  req.milestone.populate('epics').execPopulate()
    .then(milestone => res.json(milestone.epics))
    .catch(next)
})

milestone.post('/milestone/:milestoneId/epics', (req, res, next) => {
  if(typeof req.body != 'object' || !Array.isArray(req.body)){
    throw new Error(`epics exptected`)
  }
  const epicsPromises = req.body.map(epic => {
    const epicEntity = new Epic(epic)
    epicEntity.milestone = req.milestone
    return epicEntity.save()
  })
  Promise.all(epicsPromises)
    .then(epicEntities => {
      epicEntities.forEach(epicEntity => {
        req.milestone.epics.push(epicEntity)
      })
      req.milestone.save()
        .then(milestone => {
          res.json(epicEntities.map(epic => epic.id))
        })
        .catch(next)
    })
    .catch(next)
})

export default milestone
