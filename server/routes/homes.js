const express = require("express");
const router = express.Router();
const homesController = require("../controllers/homesController");

router.post("/", function(req, res, next) {
  homesController.create(req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ error: err });
      return;
    }

    res.json({ data: result });
  });
});

router.get("/", function(req, res, next) {
  homesController.find(req.query, function(err, results) {
    if (err) {
      console.log(err);
      res.json({ error: err });
      return;
    }
    res.json({ data: results });
  });
});

router.get("/:id", function(req, res, next) {
  const id = req.params.id;

  homesController.findById(id, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ data: result });
      return;
    }

    res.status(200).json({ data: result });
  });
});

module.exports = router;
