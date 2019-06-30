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

const morgan = require("morgan");
const winston = require("./config/winston");

// Logs requests
app.use(
  morgan(":remote-addr :url :method", {
    immediate: true,
    stream: {
      write: message => {
        winston.info(message.trim());
      }
    },
    skip: (req, res) => logSkip(req, res)
  })
);

// Logs responses
app.use(
  morgan(
    ":remote-addr :url :method :status :res[content-length] :response-time ms",
    {
      stream: {
        write: message => {
          winston.info(message.trim());
        }
      },
      skip: (req, res) => logSkip(req, res)
    }
  )
);

const logSkip = (req, res) =>
  req.url === "/json" || req.url === "/json/version";

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // add this line to include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

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
