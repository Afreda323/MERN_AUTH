const jwt = require("jsonwebtoken");

const config = require('../config')

function protectRoute(req, res, next) {
  const token = req.body.token || req.headers["jwt"];
  if (token) {
    jwt.verify(token, config.secret, (err, decode) => {
      if (err || !decode) {
        return res.status(400).send("Invalid token");
      }
      return next();
    });
    return;
  } else {
    return res.send("no token");
  }
}

module.exports = protectRoute