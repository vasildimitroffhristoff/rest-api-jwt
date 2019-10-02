const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {
  registerValidation,
  loginValidation
} = require('../validation/validation')

/* REGISTER CONTROLLER */

const register = async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exist')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    res.status(400).send(err)
  }
}

/* LOGIN CONTROLLER */

const login = async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email not found')

  const validaPass = await bcrypt.compare(req.body.password, user.password)
  if (!validaPass) return res.status(400).send('Invalid password')

  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token, { expiresIn: 3600 }).send(token)

  res.send('Logged in')
}

// module.exports.register = register
// module.exports.login = login

module.exports = {
  register: register,
  login: login
}
