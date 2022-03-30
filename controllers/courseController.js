const Course = require('../models/courseModel')
const asyncHandler = require('express-async-handler')

// @desc    Fetch all courses
// @route   GET /courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
  res.status(200).json(courses)
})

// @desc    Fetch course
// @route   GET /courses/:id
// @access  Public
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    res.status(400)
    throw new Error('Course not found')
  }

  // // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }
  // console.log(req.user)
  
  res.status(200).json(course)
})

module.exports = {
  getCourse,
  getCourses
}