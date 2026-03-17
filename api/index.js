// server starting file
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// limit rates
// 5 rates for each 5 min; when user hits 5 rates, wait 5 min
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min, in milliseconds so math
  max: 5,
});
app.use(limiter);
app.set("trust proxy", 1);

// make /api go to "/" route
app.use("/api", require("../routes"));

app.use(cors());

// vercel
module.exports = app;
