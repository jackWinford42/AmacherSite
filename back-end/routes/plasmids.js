"use strict";

/** Routes for plasmids. */

const jsonschema = require("jsonschema");

const { authenticateJWT, sameUser } = require("../middleware/auth")
const express = require("express");
const { BadRequestError } = require("../expressError");
const Plasmid = require("../models/plasmids");
const userUpdateSchema = require("../schemas/userUpdate.json");
const { createToken } = require("../helpers/tokens");
const router = express.Router();

router.get("/", authenticateJWT, async function (req, res, next) {
  try {
    const plasmids = await Plasmid.get();
    return res.json({ plasmids: plasmids });
  } catch (err) {
    return next(err);
  }
});

router.post("/", authenticateJWT, async function (req, res, next) {
  try {
    console.log(req.body)
    const data = req.body;
    const plasmid = await Plasmid.add(data);
    return res.json({ plasmid });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
