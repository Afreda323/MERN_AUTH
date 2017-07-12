const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const AuthRoute = require("./routes/auth");

const PORT = process.env.production || 3000;

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => {
    console.log("Mongo connected");
  })
  .catch(() => console.log("Error connecting"));
  
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use("/api", AuthRoute);

app.listen(PORT, () => {
  console.log("====================================");
  console.log("Up on " + PORT);
  console.log("====================================");
});
