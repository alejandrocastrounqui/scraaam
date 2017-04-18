import express from 'express'

import Post from '../models/Post.js'
import NoticiaComment from '../models/NoticiaComment.js'

let noticias = express.Router()

// Express routes
noticias.param('noticia', (req, res, next, value) => {
  Post.findById(value)
    .then(noticia => {
      if (! noticia ) {
        throw new Error(`Noticia no encontrada ${value}`)
      }
      req.noticia = noticia
      next()
    })
    .catch(next)
})

noticias.get('/noticias', (req, res, next) => {
  Post.find()
    .then(noticias => res.json(noticias))
    .catch(next)
})

noticias.post('/noticias', (req, res, next) => {
  const noticia = new Post(req.body)
  noticia.save()
    .then(noticia => res.json(noticia.id))
    .catch(next)
})

noticias.get('/noticias/:noticia', (req, res, next) => {
  req.noticia.populate('comments').execPopulate()
    .then(noticiaCompleta => res.json(noticiaCompleta))
    .catch(next)
})

noticias.put('/noticias/:noticia/upvote', (req, res, next) => {
  const noticia = req.noticia
  noticia.upvote()
  noticia.save()
    .then(noticiaGuardada => res.json(noticiaGuardada))
    .catch(next)
})

noticias.post('/noticias/:noticia/comentarios', (req, res, next) => {
  const noticia = req.noticia
  let comentario = new NoticiaComment(req.body)
  comentario.post = noticia
  comentario.save()
    .then(comentarioGuardado => {
      // guardamos el resultado en una variable de
      // mayor scope para que el segundo then pueda acceder
      // a este valor
      comentario = comentarioGuardado
      noticia.comments.push(comentario)
      return noticia.save()
    })
    .then(noticiaGuardada => res.json(comentario))
    .catch(next)
})

export default noticias
