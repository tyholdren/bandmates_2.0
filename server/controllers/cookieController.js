const cookieController = {};

cookieController.createCookie = (req, res, next) => {
  res.cookie("SSID", res.locals.userId);
  next();
};

cookieController.trashCookie = (req, res, next) => {
  res.cookie("SSID", "", { maxAge: 0 });
  next();
};

module.exports = cookieController;
