const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

function protectRoute(req, res, next) {
  const token = req.body.token || req.headers["jwt"];
  if (token) {
    jwt.verify(token, config.secret, (err, decode) => {
      if (err || !decode) {
        return res.status(401).send("Invalid token");
      }
      User.findOne({_id: decode.sub}, (err, user) => {
        if(err || !user) {
          return res.status(401).send("Something went wrong");
        }
        if(user.isVerified === false) {
          return res.status(401).send("Account not activated");
        }
        return next();
      })      
    });
  } else {
    return res.status(401).send("no token");
  }
}

module.exports = protectRoute;
