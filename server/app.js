const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const routes = require("./routes/index");
const authRoute = require("./routes/auth");
const homesRoute = require("./routes/homes");

const authCheckMiddleware = require("./middleware/authCheck");

let app = express();
const PORT = process.env.PORT || 5000;

const dbURL = process.env.MONGO_DB_URL;
mongoose.connect(
  dbURL,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  function(err) {
    if (err) {
      console.log("Error connecting to db");
    } else {
      console.log("Connected to db");
    }
  }
);

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);
app.use("/user", authRoute);

app.post("/homes", authCheckMiddleware);
app.use("/homes", homesRoute);

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
