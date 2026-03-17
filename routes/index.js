const express = require("express");
const needle = require("needle");
const url = require("url");
const apiCache = require("apicache");

const PLANTS_API_BASE_URL = process.env.PLANTS_API_BASE_URL;
const PLANTS_API_KEY_NAME = process.env.PLANTS_API_KEY_NAME;
const PLANTS_API_KEY = process.env.PLANTS_API_KEY;

const router = express.Router();

let cache = apiCache.middleware;

// needle is promises so async
router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    // url params to attach to plants api
    const params = new URLSearchParams({
      [PLANTS_API_KEY_NAME]: PLANTS_API_KEY, // ?token=key
      ...url.parse(req.url, true).query, // query to get whatever query params are passed in
    });
    const apiRes = await needle(
      "get",
      `${PLANTS_API_BASE_URL}/search?${params}`,
    );
    const data = apiRes.body;
    // if not in production, log request
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${PLANTS_API_BASE_URL}?${params}`);
    }
    res.status(200).json(data); // 200 is success
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 is internal/server error
  }
});

module.exports = router;
