const express = require("express");
const Router = express.Router();
const User = require("../models/User");

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
    User.findOne({ email: email }, function(err, user){
      console.log('test', user)
      if (err) {
        return res.status(400).send("Something went wrong.");
      }
      if(!user) {
          return res.status(400).send("You don't have an account.");
      }
      user.comparePassword(password, (err, match) => {
        if (err) {
          return res.status(400).send("Something went wrong.");
        }
        return res.json({ user: user });
      });
    });
  } else {
    return res.status(400).send("Please enter a valid username and password.");
  }
});
module.exports = Router;
