const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      maxlength: 50,
    },
    
    description: {
      type: String,
      maxlength: 500,
    },

    targetDate: {
        type: Date,
        required: true,
    },

    progress: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0,
      },  

      status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
        default: 'Not Started',
      },

      assignedTo: {
        type: mongoose.Types.ObjectId,
        ref: 'User', 
      },

   createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Goal', GoalSchema)