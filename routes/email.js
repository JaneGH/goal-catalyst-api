
const express = require('express');
const router = express.Router()

const { sendEmailController } = require("../controllers/email")


/**
 * @swagger
 * /api/v1/email:
 *   post:
 *     summary: Send an email
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 description: The recipient's email address
 *               subject:
 *                 type: string
 *                 description: The subject of the email
 *               message:
 *                 type: string
 *                 description: The content of the email
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Invalid email data
 *       500:
 *         description: Internal server error
 */

 router.route('/').post(sendEmailController)
 
 module.exports = router