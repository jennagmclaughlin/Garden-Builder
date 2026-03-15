const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5500; // 5500 is localhost fallback if port isnt in dotenv

const app = express();

// make /api go to "/" route
app.use("/api", require("./routes"));

app.use(cors());

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
