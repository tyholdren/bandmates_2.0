const cookieController = {};

cookieController.createCookie = (req, res, next) => {
  res.cookie('SSID', res.locals.userId);
  next();
}


module.exports = cookieController;