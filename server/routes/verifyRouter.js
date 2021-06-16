const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();


router.post('/login', userController.verifyUser, cookieController.createCookie, (req,res,next) => {
  res.status(200).json(res.locals); // res.locals => body = {valid: true} 
})




module.exports = router;
