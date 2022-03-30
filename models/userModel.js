const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  rollNo: {
    type: Number,
    required: [true, 'Please add your roll no'],
    unique: true
  },
  dept: {
    type: String,
    required: [true, 'Please add a department'],
  },
  semNo: { type: Number },
  courses: {
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
})

module.exports = mongoose.model('User', userSchema)