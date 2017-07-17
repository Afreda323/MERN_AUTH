module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/auth",
  secret: process.env.SECRET || "YOUR SECRET HERE",
  email: process.env.EMAIL || "YOUR GMAIL HERE",
  password: process.env.PW || "YOUR GMAIL PASSWORD HERE",
  activateURL: "https://intelligent-croissant-93086.herokuapp.com//api/activate/"
};
