"use strict";

/** Routes for purified proteins. */

const { authenticateJWT, sameUser } = require("../middleware/auth")
const express = require("express");
const { BadRequestError } = require("../expressError");
const GlycerolStock = require("../models/glycerolStocks");
const { createToken } = require("../helpers/tokens");
const router = express.Router();

router.get("/", authenticateJWT, async function (req, res, next) {
  try {
    const glycerolStocks = await GlycerolStock.get();
    return res.json({ glycerolStocks: glycerolStocks});
  } catch (err) {
    return next(err);
  }
});

router.post("/", authenticateJWT, async function (req, res, next) {
  try {
    console.log(req.body)
    const data = req.body;
    const glycerolStock = await GlycerolStock.add(data);
    console.log(glycerolStock)
    return res.json({ glycerolStock });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
