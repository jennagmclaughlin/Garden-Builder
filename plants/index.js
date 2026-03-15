require("dotenv").config();
const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.json({ success: "Hello plants!" });
});

router.get("/:searchtext", async (req, res) => {
  const searchtext = req.params.searchtext;
  const data = await fetchPlants(searchtext);
  res.json(data);
});

router.post("/", async (req, res) => {
  const searchtext = req.body.searchtext;
  const data = await fetchPlants(searchtext);
  res.json(data);
});

module.exports = router;
