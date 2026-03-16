const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const PORT = process.env.PORT || 5500; // 5500 is localhost fallback if port isnt in dotenv

const app = express();

// limit rates
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5,
});
app.use(limiter);
app.set("trust proxy", 1);

// set static folder so index.html can load!
app.use(express.static("public"));

// make /api go to "/" route
app.use("/api", require("./routes"));

app.use(cors());

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
