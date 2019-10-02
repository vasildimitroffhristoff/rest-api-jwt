const router = require('express').Router()
const userController = require('../controllers/userController')

/* 
  @route  :: POST /api/users/register
  @desc   :: Signup User - check if email exists ,encrypt the password, save in Mongo
  @access :: Public
*/
router.post('/register', userController.register)

/* 
  @route  :: POST /api/users/login
  @desc   :: Login User / Returning JWT Token
  @access :: Public
*/
router.post('/login', userController.login)

module.exports = router
