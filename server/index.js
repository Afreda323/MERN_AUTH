const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const path = require("path");
const config = require("./config");
const AuthRoute = require("./routes/auth");
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("====================================");
    console.log("Mongo connected");
    console.log("====================================");
  })
  .catch(() => console.log("Error connecting"));

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());

app.use("/api", AuthRoute);

app.use(express.static("build"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(config.port, () => {
  console.log("====================================");
  console.log("Up on " + config.port);
  console.log("====================================");
});
