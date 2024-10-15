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


/**
 * @swagger
 * /api/v1/goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the goal
 *               description:
 *                 type: string
 *                 description: A detailed description of the goal
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Invalid goal data
 */

/**
 * @swagger
 * /api/v1/goals/all:
 *   get:
 *     summary: Get all goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of all goals
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/goals/assigned:
 *   get:
 *     summary: Get all assigned goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of all assigned goals
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/goals/{id}:
 *   get:
 *     summary: Get a goal by ID
 *     tags: [Goals]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the goal to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Goal retrieved successfully
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a goal by ID
 *     tags: [Goals]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the goal to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Goal deleted successfully
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update a goal by ID
 *     tags: [Goals]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the goal to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the goal
 *               description:
 *                 type: string
 *                 description: The new description of the goal
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       400:
 *         description: Invalid goal data
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Internal server error
 */


router.route('/').post(createGoal)
router.route('/all').get(getAllGoals);
router.route('/assigned').get(getAllAssignedGoals);
router.route('/:id').get(getGoal).delete(deleteGoal).patch(updateGoal)

module.exports = router