const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config");

const genJWT = user => {
  const token = jwt.sign({ sub: user._id, iat: Date.now() }, config.secret);
  return token;
};

exports.signupUser = (req, res) => {
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
      return res.json({ token: genJWT(user) });
    });
  } else {
    return res.status(400).send("Please enter a valid username and password.");
  }
}

exports.loginUser = (req, res) => {
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
}