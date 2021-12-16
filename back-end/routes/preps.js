"use strict";

/** Routes for protein preps. */

const jsonschema = require("jsonschema");

const { authenticateJWT, sameUser } = require("../middleware/auth")
const express = require("express");
const { BadRequestError } = require("../expressError");
const Prep = require("../models/proPreps");
const router = express.Router();

router.get("/", authenticateJWT, async function (req, res, next) {
  try {
    const preps = await Prep.get();
    return res.json({ preps: preps});
  } catch (err) {
    return next(err);
  }
});

router.post("/", authenticateJWT, async function (req, res, next) {
  try {
    const data = req.body;
    console.log(data);
    const prep = await Prep.add(data);
    return res.json({ prep });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
