const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const config = require("../config");
const nodemailer = require("nodemailer");

const EMAIL = config.email;
const PW = config.password;
const URL = config.activateURL;

const sendMail = (email, token) => {
  let transporter = nodemailer.createTransport({
    service: config.emailProvider,
    // host: "smtp.gmail.com",
    auth: {
      user: EMAIL,
      pass: PW
    }
  });
  let mailOptions = {
    from: `"MERN AUTH" <${EMAIL}>`,
    to: email,
    subject: "MERN Activation",
    text: `Activate your account ${URL}${token}`,
    html: `<b>Please Activate your account</b><br /><p>${URL}${token}</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
};

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
    const randomString = crypto.randomBytes(20);
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      verificationCode: randomString.toString("hex")
    });
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send("Something went wrong");
      }
      sendMail(req.body.email, randomString.toString("hex"));
      return res.json({ token: genJWT(user) });
    });
  } else {
    return res.status(400).send("Please enter a valid username and password.");
  }
};

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
};

exports.activateUser = (req, res) => {
  User.findOne({ verificationCode: req.params.code }, (err, user) => {
    if (err) {
      return res.status(400).send("Something went wrong");
    }
    if (!user) {
      return res.send(
        "Your account either doesn't exist or has already been verified"
      );
    }
    user.isVerified = true;
    user.verificationCode = undefined;

    user.save();

    return res.redirect(req.protocol + '://' + req.get('host') + '/verified');
  });
};
