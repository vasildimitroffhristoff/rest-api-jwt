const router = require('express').Router()
const verify = require('./verifytoken')
const User = require('../models/User')

router.get('/', verify, async (req, res) => {
  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!user) {
        return res.status(404).json('No user found')
      } else {
        res.json({
          id: user._id,
          name: user.name,
          email: user.email,
          date: user.date
        })
      }
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
