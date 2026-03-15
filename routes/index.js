const express = require("express");
const needle = require("needle");

const PLANTS_API_BASE_URL = process.env.PLANTS_API_BASE_URL;
const PLANTS_API_KEY_NAME = process.env.PLANTS_API_KEY_NAME;
const PLANTS_API_KEY = process.env.PLANTS_API_KEY;

const router = express.Router();

// needle is promises so async
router.get("/", async (req, res) => {
  try {
    // url params to attach to plants api
    const params = new URLSearchParams({
      [PLANTS_API_KEY_NAME]: PLANTS_API_KEY, // ?token=key
    });
    const apiRes = await needle("get", `${PLANTS_API_BASE_URL}?${params}`);
    const data = apiRes.body;
    res.status(200).json(data); // 200 is success
  } catch {
    res.status(500).json({ error }); // 500 is internal/server error
  }
});

module.exports = router;
