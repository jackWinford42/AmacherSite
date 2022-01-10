"use strict";

/** Express app for ramt. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const plasmidRoutes = require("./routes/plasmids");
const prepRoutes = require("./routes/preps");
const puriProtRoutes = require("./routes/purifiedProteins");
const projectRoutes = require("./routes/projects");
const glyStockRoutes = require("./routes/glycerolStocks");

const morgan = require("morgan");

const app = express();


app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/plasmids", plasmidRoutes);
app.use("/preps", prepRoutes);
app.use("/purifiedProteins", puriProtRoutes);
app.use("/projects", projectRoutes);
app.use("/glycerolStocks", glyStockRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.log(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
