const express = require('express')
const passport = require('passport')

const Post = require('../models/post')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

// const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Index
router.get('/posts/comments/:id', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .populate('comments.owner', 'username')
    .then(post => res.status(200).json({ comments: post.comments.reverse() }))
    .catch(next)
})

// Show
router.get('/posts/comments/:id/:num', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .populate('comments.owner', 'username')
    .then(post => {
      return post.comments.find(comment => `${comment._id}` === req.params.num)
    })
    .then(post => res.status(200).json({ comment: post }))
    .catch(next)
})

// Create
router.post('/posts/comments/:id', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      req.body.comment.owner = req.user.id
      post.comments.push(req.body.comment)
      post.save()
      return post
    })
    .then(post => res.status(201).json({ post: post.toObject() }))
    .catch(next)
})

// Update
router.patch('/posts/comments/:id/:num', requireToken, (req, res, next) => {
  delete req.body.comment.owner
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      const comments = post.comments
      let item
      comments.forEach((comment, index) => {
        if (`${comment._id}` === req.params.num) {
          item = comment
        }
      })
      if (req.body.comment.title) {
        item.title = req.body.comment.title
      }
      if (req.body.comment.text) {
        item.text = req.body.comment.text
      }
      post.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Destroy
router.delete('/posts/comments/:id/:num', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      const comments = post.comments
      let item
      let place
      comments.forEach((comment, index) => {
        if (`${comment._id}` === req.params.num) {
          item = comment
          place = index
        }
      })
      if (item) {
        requireOwnership(req, item)
        post.comments.splice(place, 1)
      }
      post.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
