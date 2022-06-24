const express = require('express');
const app = express();
const taskRoute = express.Router();

// Task model
let Task = require('../models/Task');

// Add Task
taskRoute.route('/addTask').post((req, res, next) => {
  Task.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Task
taskRoute.route('/getallTask').get((req, res) => {
  Task.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Task
taskRoute.route('/getTask/:id').get((req, res) => {
  Task.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Task
taskRoute.route('/updateTask/:id').put((req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Task
taskRoute.route('/deleteTask/:id').delete((req, res, next) => {
  Task.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = taskRoute;
