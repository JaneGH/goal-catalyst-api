const Goal = require('../models/Goal')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const { BadRequestError, NotFoundError } = require('../errors')

const getAllGoals = async (req, res) => {
  const { status, sort, search } = req.query;

  const query = { createdBy: req.user.userId };

  if (status && status !== 'all') {
      query.status = status;
  }

  if (search) {
      query.title = { $regex: search, $options: 'i' }; 
  }

  try {
      let sortOptions = {};
      if (sort) {
        if (sort === 'z-a') {
            sortOptions.title = -1; 
        } else if (sort === 'a-z') {
            sortOptions.title = 1; 
        } else if (sort === 'latest') {
            sortOptions.createdAt = -1; 
        } else if (sort === 'oldest') {
            sortOptions.createdAt = 1; 
        }
      } else {
        sortOptions.createdAt = 1; // Default sort order (ascending by createdAt)
      } 

      const goals = await Goal.find(query).sort(sortOptions);
      res.status(StatusCodes.OK).json({ goals, count: goals.length });
  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAllAssignedGoals = async (req, res) => {
  const goals = await Goal.find({ assignedTo: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ goals, count: goals.length })
}

const getGoal = async (req, res) => {
    const {
        user: { userId },
        params: { id: goalId },
      } = req
  
      const goal = await Goal.findOne({
        _id: goalId,
        createdBy: userId,
      })
      if (!goal) {
        throw new NotFoundError(`No goal with id ${goalId}`)
      }
      res.status(StatusCodes.OK).json({ goal })
}


const createGoal = async (req, res) => {
    req.body.createdBy = req.user.userId
    console.log(`Body: ${JSON.stringify(req.body)}...`)
    
    const { assignedToEmail } = req.body;

    if (assignedToEmail) {
       const assignedUser = await User.findOne({ email: assignedToEmail });
   
       if (!assignedUser) {
          return res.status(StatusCodes.NOT_FOUND).json({ error: 'User with assigned email not found' });
      }

      // Assign the user ID to assignedTo
      req.body.assignedTo = assignedUser._id;

    }

    try {
        const goal = await Goal.create(req.body);
        res.status(StatusCodes.CREATED).json({ goal });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
    // res.send('create goal')
}

const updateGoal = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: goalId },
      } = req

      const { assignedToEmail } = req.body;
    
      if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
      }

      if (assignedToEmail) {
        const assignedUser = await User.findOne({ email: assignedToEmail });
    
        if (!assignedUser) {
           return res.status(StatusCodes.NOT_FOUND).json({ error: 'User with assigned email not found' });
       }
 
       // Assign the user ID to assignedTo
       req.body.assignedTo = assignedUser._id;
 
     }

      const goal = await Goal.findByIdAndUpdate(
        { _id: goalId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!goal) {
        throw new NotFoundError(`No goal with id ${goalId}`)
      }
      res.status(StatusCodes.OK).json({ goal })
}

const deleteGoal = async (req, res) => {
    const {
      //  user: { userId },
        params: { id: goalId },
      } = req
    
      const goal = await Goal.findOneAndDelete({
        _id: goalId,
   //     createdBy: userId,
      })
      if (!goal) {
        throw new NotFoundError(`No goal with id ${goalId}`)
      }
      res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllGoals,
    getAllAssignedGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal
}