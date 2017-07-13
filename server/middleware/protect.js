const jwt = require("jsonwebtoken");

const config = require('../config')

function protectRoute(req, res, next) {
  const token = req.body.token || req.headers["jwt"];
  console.log(req.headers)
  if (token) {
    jwt.verify(token, config.secret, (err, decode) => {
      if (err || !decode) {
        return res.status(401).send("Invalid token");
      }
      return next();
    });
  } else {
    return res.status(401).send("no token");
  }
}

module.exports = protectRoute