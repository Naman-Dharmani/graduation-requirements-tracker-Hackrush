const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, rollNo, dept, semNo, password, password2} = req.body
  if(password !== password2){
    res.status(400)
    throw new Error('Passwords do not match')
  }
  if(!name || !email || !rollNo || !dept || !semNo || !password || !password2){
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create User
  const user = await User.create({ name, email, rollNo, dept, semNo, password: hashedPassword })

  if(user){
    res.status(201).redirect('/user/login')
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { rollNo, password } = req.body
  
  const user = await User.findOne({ rollNo })
  
  if (user && (await bcrypt.compare(password, user.password))) {
    // res.status(200).redirect('/')
    res.status(200).json({ message: "Logged in Successfully" })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const getUserCourses = asyncHandler(async (req, res) => {
  res.status(200).render('userCourses', { pageTitle: 'My Courses' })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    'expiresIn': '1h'
  })
}

module.exports = {
  loginUser,
  registerUser,
  getUserCourses
}