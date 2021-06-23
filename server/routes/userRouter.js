const express = require("express");
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");

const router = express.Router();

router.get("/", userController.viewUsers, (req, res, next) => {
  try {
    res.status(200).json({ users: res.locals.users });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  userController.createUser,
  cookieController.createCookie,
  (req, res, next) => {
    try {
      res.status(200).json(res.locals.user);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", userController.findUser, (req, res, next) => {
  try {
    res.status(200).json(res.locals.user);
  } catch (error) {
    next(error);
  }
});

router.post("/followers", userController.addFollower, (req, res, next) => {
  try {
    res.status(200).json(res.locals.user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", userController.deleteUser, (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", userController.updateUser, (req, res, next) => {
  try {
    res.status(200).json(res.locals.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
