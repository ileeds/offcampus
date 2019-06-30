const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/:email", function(req, res, next) {
  authController.login(req.body.email, req.body.password, function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(err.status || 500).json({ error: err });
      return;
    }

    if (result) {
      res.status(200).json({
        data: {
          tokenID: result,
          email: req.body.email
        }
      });
    } else {
      res.status(401).json({ data: result });
    }
  });
});

router.post("/", function(req, res, next) {
  const { email, password, firstName, lastName } = req.body;
  authController.register(email, password, firstName, lastName, function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(err.status || 500).json({ error: err });
      return;
    }
    if (result) {
      res.status(200).json({
        data: {
          tokenID: result,
          email: req.body.email
        }
      });
    } else {
      res.status(401).json({ data: result });
    }
  });
});

module.exports = router;
