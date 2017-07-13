const express = require("express");
const Router = express.Router();

const User = require("../models/User");
const protectRoute = require("../middleware/protect");
const { loginUser, signupUser } = require("../controllers/auth");

Router.post("/", loginUser);
Router.post("/signup", signupUser);

Router.use(protectRoute);

Router.get("/secret", (req, res) => {
  res.json({message: "you made it"});
});

module.exports = Router;
