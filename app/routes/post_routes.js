const express = require('express')
const passport = require('passport')

const Post = require('../models/post')
const User = require('../models/user')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Index
router.get('/posts', requireToken, (req, res, next) => {
  Post.find()
    .populate('owner', 'username')
    .then(posts => res.status(200).json({ posts: posts.reverse() }))
    .catch(next)
})

// Index friends posts
router.get('/friends/posts', requireToken, (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      const friendsList = user.friends.map(friend => friend._id)
      return friendsList
    })
    .then(list => {
      return Post.find({ owner: list }).populate('owner', 'username').catch(next)
    })
    .then(posts => res.status(200).json({ posts: posts.reverse() }))
    .catch(next)
})

// Index user's posts
router.get('/myPosts', requireToken, (req, res, next) => {
  Post.find({ owner: req.user.id })
    .then(posts => res.status(200).json({ posts: posts.reverse() }))
    .catch(next)
})

// Show
router.get('/posts/:id', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .populate('owner', 'username')
    .then(handle404)
    .then(post => res.status(200).json({ post: post.toObject() }))
    .catch(next)
})

// Create
router.post('/posts', requireToken, (req, res, next) => {
  req.body.post.owner = req.user.id

  Post.create(req.body.post)
    .then(post => {
      res.status(201).json({ post: post.toObject() })
    })
    .catch(next)
})

// Update
router.patch('/posts/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.post.owner

  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      requireOwnership(req, post)
      return post.updateOne(req.body.post)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Destroy
router.delete('/posts/:id', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      requireOwnership(req, post)
      post.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
