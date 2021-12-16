"use strict";

/** Routes for projects. */

const { authenticateJWT, sameUser } = require("../middleware/auth")
const express = require("express");
const { BadRequestError } = require("../expressError");
const Project = require("../models/projects");
const userUpdateSchema = require("../schemas/userUpdate.json");
const { createToken } = require("../helpers/tokens");
const router = express.Router();

router.get("/", authenticateJWT, async function (req, res, next) {
  try {
    const projects = await Project.getAll();
    return res.json({ projects: projects });
  } catch (err) {
    return next(err);
  }
});

router.post("/", authenticateJWT, async function (req, res, next) {
  try { 
    const data = req.body;
    const newProject = await Project.add(data);
    return res.json({ newProject });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
