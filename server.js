// when users input an expense or deposit without internet connection, they get a notification that they have added an expense or depost
// when internet connection is reestablished, the deposits or expenses added when offline are added to their transaction history and their totals are updated
// idb.js file added to public/js
// add display property to manifest.json
// uses mongodb
// deploy with heroku and mongodb atlas

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});