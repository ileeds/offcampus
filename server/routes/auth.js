const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
  "/email/:email",
  [
    check("email", "Email is required")
      .not()
      .isEmpty()
      .normalizeEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    authController.emailLogin(
      req.body.email,
      req.body.password,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err });
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
          res.status(401).json({ data: null });
        }
      }
    );
  }
);

router.post(
  "/email",
  [
    check("email", "Your email is not valid")
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check("password", "Your password must be at least 8 characters")
      .not()
      .isEmpty()
      .isLength({ min: 8 }),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
    check("firstName")
      .exists()
      .isLength({ min: 1 })
      .trim()
      .escape()
      .withMessage("First name must be present"),
    check("lastName")
      .exists()
      .isLength({ min: 1 })
      .trim()
      .escape()
      .withMessage("Last name must be present")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { email, password, firstName, lastName } = req.body;
    authController.emailRegister(
      email,
      password,
      firstName,
      lastName,
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err });
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
          res.status(401).json({ data: null });
        }
      }
    );
  }
);

module.exports = router;
