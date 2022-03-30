const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  credits: { type: Number, required: true },
  type: { type: String },
  offSem: { type: String, required: true }
})

module.exports = mongoose.model('Course', courseSchema)