const express = require('express')

const router = express.Router()
const {
  createGoal,
  deleteGoal,
  getAllGoals,
  getAllAssignedGoals,
  updateGoal,
  getGoal,
} = require('../controllers/goals')

router.route('/').post(createGoal)


router.route('/all').get(getAllGoals);
router.route('/assigned').get(getAllAssignedGoals);

router.route('/:id').get(getGoal).delete(deleteGoal).patch(updateGoal)

module.exports = router