const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Task = new Schema({
  name: {
    type: String
  },
  priority: {
    type: Number
  },
  deadline: {
    type: String
  }
}, {
  collection: 'tasks'
})

module.exports = mongoose.model('Task', Task)
