"use strict";

/** Routes for purified proteins. */

const { authenticateJWT, sameUser } = require("../middleware/auth")
const express = require("express");
const { BadRequestError } = require("../expressError");
const PurifiedProtein = require("../models/purifiedProteins");
const { createToken } = require("../helpers/tokens");
const router = express.Router();

router.get("/", authenticateJWT, async function (req, res, next) {
  try {
    const purifiedProteins = await PurifiedProtein.get();
    return res.json({ purifiedProteins: purifiedProteins});
  } catch (err) {
    return next(err);
  }
});

router.post("/", authenticateJWT, async function (req, res, next) {
  try {
    console.log(req.body)
    const data = req.body;
    const purifiedProtein = await PurifiedProtein.add(data);
    console.log(purifiedProtein)
    return res.json({ purifiedProtein });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
