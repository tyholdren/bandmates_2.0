const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


router.post('/login', userController.verifyUser, (req,res,next) => {
  res.status(200).json(res.locals);
})




module.exports = router;
