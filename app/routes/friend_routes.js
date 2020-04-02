const express = require('express')
const passport = require('passport')

const User = require('../models/user')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const BadParamsError = customErrors.BadParamsError
// const requireOwnership = customErrors.requireOwnership

// const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Index
router.get('/friends', requireToken, (req, res, next) => {
  User.find()
    .then(users => res.status(200).json({ users: users.map(user => user.toObject()) }))
    .catch(next)
})

// Show
router.get('/friends/:username', requireToken, (req, res, next) => {
  User.find({ username: req.params.username })
    .then(handle404)
    .then(user => res.status(200).json({ user: user[0].toObject() }))
    .catch(next)
})

// Follow friend
router.post('/friends/:username', requireToken, (req, res, next) => {
  User.find({ username: req.params.username })
    .then(handle404)
    .then(user => {
      const newFriend = user[0]
      User.findById(req.user.id)
        .then(handle404)
        .then(person => {
          person.friends.forEach(user => {
            if (user.username === newFriend.username) {
              throw new BadParamsError()
            }
          })
          person.friends.push(newFriend)
          person.save()
          return person
        })
        .catch(next)
      return user[0]
    })
    .then(user => res.status(201).json({ newFriend: user.toObject() }))
    .catch(next)
})

// Unfollow friend
router.delete('/friends/:username', requireToken, (req, res, next) => {
  User.find({ username: req.params.username })
    .then(handle404)
    .then(user => {
      const oldFriend = user[0]
      User.findById(req.user.id)
        .then(handle404)
        .then(person => {
          let place
          person.friends.forEach((user, index) => {
            if (user.username === oldFriend.username) {
              place = index
            }
          })
          if (place !== undefined) {
            person.friends.splice(place, 1)
          }
          person.save()
          return person
        })
        .catch(next)
      return user
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
