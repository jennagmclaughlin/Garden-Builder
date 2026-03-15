require("dotenv").config();
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = 5500;

app.use(express.json());
