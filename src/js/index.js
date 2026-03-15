require("dotenv").config();
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = 5500;

app.use(express.json());
const whitelist = ["http://127.0.0.1", "http://127.0.0.1:5500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// one request per second
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});
app.use(limiter);

// test route
app.get("/", (req, res) => res.json({ success: "Hello World" }));

app.listen(port, () => console.log(`App listening on port ${port}`));

// searching for plants route
const fetchPlants = async (searchtext) => {
  const url = `https://trefle.io/api/v1/plants/search?token=${process.env.PLANTS_API_KEY}&q=${searchtext}`;
  try {
    const plantsStream = await fetch(url);
    const plantsJson = await plantsStream.json();
    return plantsJson;
  } catch (err) {
    return { Error: err.stack };
  }
};
