const express = require('express')
const passport = require('passport')

const Like = require('../models/like')

const customErrors = require('../../lib/custom_errors')
const handleUnliked = customErrors.handleUnliked
const handleLiked = customErrors.handleLiked

const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Get amount of likes for post
router.get('/likes/:id', requireToken, (req, res, next) => {
  Like.find({ post: req.params.id })
    .then(posts => res.status(201).json({ likeCount: posts.length }))
    .catch(next)
})

// Like
router.post('/likes', requireToken, (req, res, next) => {
  req.body.like.owner = req.user.id

  Like.find({ owner: req.body.like.owner, post: req.body.like.post })
    .then(handleLiked)
    .then(like => {
      Like.create(req.body.like)
        .then(like => {
          res.status(201).json({ like: like.toObject() })
        })
    })
    .catch(next)
})

// Unlike
router.delete('/likes', requireToken, (req, res, next) => {
  Like.find({ owner: req.user.id, post: req.body.like.post })
    .then(handleUnliked)
    .then(like => {
      like = like[0]
      like.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// FOR POSTMAN, DELETE BEFORE SUBMISSION
router.get('/likes', (req, res, next) => {
  Like.find()
    .then(likes => res.status(200).json({ likes }))
    .catch(next)
})

module.exports = router
