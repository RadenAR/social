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
    .then(likes => res.status(200).json({ likeCount: likes.length }))
    .catch(next)
})

// Check if liked a single post
router.get('/likes/number/:id', requireToken, (req, res, next) => {
  Like.find({ owner: req.user.id, post: req.params.id })
    .then(likes => {
      let liked
      if (likes.length > 0) {
        liked = true
      } else {
        liked = false
      }
      return res.status(200).json({ liked })
    })
})

// Like
router.post('/likes/:id', requireToken, (req, res, next) => {
  Like.find({ owner: req.user.id, post: req.params.id })
    .then(handleLiked)
    .then(like => {
      const newLike = {
        owner: req.user.id,
        post: req.params.id
      }
      Like.create(newLike)
        .then(() => { res.sendStatus(201) })
    })
    .catch(next)
})

// Unlike
router.delete('/likes/:id', requireToken, (req, res, next) => {
  Like.find({ owner: req.user.id, post: req.params.id })
    .then(handleUnliked)
    .then(like => {
      like = like[0]
      like.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// FOR POSTMAN, DELETE BEFORE SUBMISSION
// router.get('/likes', (req, res, next) => {
//   Like.find()
//     .then(likes => res.status(200).json({ likes }))
//     .catch(next)
// })

module.exports = router
