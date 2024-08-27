
const express = require('express');
const router = express.Router()

const { sendEmailController } = require("../controllers/email")

 router.route('/').get(sendEmailController)
 
 module.exports = router