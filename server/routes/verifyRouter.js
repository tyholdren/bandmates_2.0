const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();
let blob;

router.post('/login', userController.verifyUser, cookieController.createCookie, (req,res,next) => {
  res.status(200).json(res.locals); // res.locals => body = {valid: true} 
});

router.get('/logout', cookieController.trashCookie,(req, res, next)=> {
  res.status(200).json();
});

router.post('/testingBlob', (req,res,next) => {
  if(blob)
  res.status(200).json();
})



module.exports = router;
