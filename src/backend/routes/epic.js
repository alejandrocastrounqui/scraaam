import express from 'express'

import Epic    from '../models/Epic.js'
import EpicTask    from '../models/EpicTask.js'
import EpicComment from '../models/EpicComment.js'

let epic = express.Router()

// Express routes
epic.param('epicId', (req, res, next, epicId) => {
  Epic.findById(epicId)
    .then(epic => {
      if (! epic ) {
        throw new Error(`epic id:${epicId} not found`)
      }
      req.epic = epic
      next()
    })
    .catch(next)
})

epic.get('/epic', (req, res, next) => {
  Epic.find()
    .then(epics => res.json(epics))
    .catch(next)
})

//TODO: hacer el update parcial
epic.patch('/epic/:epicId', (req, res, next) => {
  const newEpic = new Epic(req.body)
  newEpic.save()
    .then(epic => res.json(epic.id))
    .catch(next)
})

epic.get('/epic/:epicId', (req, res, next) => res.json(req.epic))

epic.get('/epic/:epicId/tasks', (req, res, next) => {
  req.epic.populate('tasks').execPopulate()
    .then(epic => res.json(epic.tasks))
    .catch(next)
})

epic.get('/epic/:epicId/comments', (req, res, next) => {
  req.epic.populate('comments').execPopulate()
    .then(epic => res.json(epic.comments))
    .catch(next)
})

epic.post('/epic/:epicId/tasks', (req, res, next) => {
  if(typeof req.body != 'object' || !Array.isArray(req.body)){
    throw new Error(`tasks exptected`)
  }
  const tasksPromises = req.body.map(task => {
    const taskEntity = new EpicTask(task)
    taskEntity.epic = req.epic
    return taskEntity.save()
  })
  Promise.all(tasksPromises)
    .then(taskEntities => {
      taskEntities.forEach(taskEntity => {
        req.epic.tasks.push(taskEntity)
      })
      req.epic.save()
        .then(epic => {
          res.json(taskEntities.map(task => task.id))
        })
        .catch(next)
    })
    .catch(next)
})

epic.post('/epic/:epicId/comments', (req, res, next) => {
  if(typeof req.body != 'object' || !Array.isArray(req.body)){
    throw new Error(`comments exptected`)
  }
  const commentsPromises = req.body.map(comment => {
    const commentEntity = new Comment(comment)
    commentEntity.epic = req.epic
    return commentEntity.save()
  })
  Promise.all(commentsPromises)
    .then(commentEntities => {
      commentEntities.forEach(commentEntity => {
        req.epic.comments.push(commentEntity)
      })
      req.epic.save()
        .then(epic => {
          res.json(commentEntities.map(comment => comment.id))
        })
        .catch(next)
    })
    .catch(next)
})

export default epic
