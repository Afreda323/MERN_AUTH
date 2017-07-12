const express = require("express");
const Router = express.Router();
const User = require("../models/User");
var jwt = require("jsonwebtoken");

const genJWT = user => {
  const token = jwt.sign({ id: user._id, iat: Date.now() }, "dasitmane");
  return token;
};

Router.post("/signup", (req, res) => {
  if (
    req.body.email &&
    req.body.email.length > 2 &&
    req.body.password &&
    req.body.password.length > 5
  ) {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send("Something went wrong");
      }
      return res.status(200).json({ user: user });
    });
  } else {
    return res.status(400).send("Please enter a valid username and password.");
  }
});

Router.post("/", (req, res) => {
  if (
    req.body.email &&
    req.body.email.length > 2 &&
    req.body.password &&
    req.body.password.length > 5
  ) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    User.findOne({ email: email }, function(err, user) {
      if (err) {
        return res.status(400).send("Something went wrong.");
      }
      if (!user) {
        return res.status(400).send("You don't have an account.");
      }
      user.comparePassword(password, (err, match) => {
        if (err) {
          return res.status(400).send("Something went wrong.");
        }
        return res.json({ token: genJWT(user) });
      });
    });
  } else {
    return res.status(400).send("Please enter a valid username and password.");
  }
});
function protect(req, res, next) {
  const token = req.body.token || req.headers["jwt"];
  if (token) {
    jwt.verify(token, "dasitmane", (err, decode) => {
      if (err || !decode) {
        return res.status(400).send("Invalid token");
      }
      return next()
    });
    return;
  } else {
    return res.send("no token");
  }
}

Router.use(protect);
Router.get("/secret", (req, res) => {
    res.send('you made it')
});
module.exports = Router;
