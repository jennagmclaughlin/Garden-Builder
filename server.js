if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
} 

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // set where views are coming from, which is a "views" directory
app.set("layout", "layouts/layout"); // same as above, but this time with layouts
app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;
database.on("error", error => console.error(error));
database.once("open", () => console.log("Connected to Mongoose! :-)"));

// the index handles the very route (/) of our project
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);