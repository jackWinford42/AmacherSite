"use strict";

/** Routes for tray calculator. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const TrayCalc = require("../models/trayCalc");
const userUpdateSchema = require("../schemas/userUpdate.json");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const crystals = await TrayCalc.get();
    return res.json({ crystals: crystals});
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const data = req.body;
    const crystals = await TrayCalc.add(data);
    return res.json({ crystal });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
