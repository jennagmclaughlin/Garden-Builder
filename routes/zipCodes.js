const express = require("express");
const router = express.Router(); // router = controller

router.get("/", (request, response) => {
    response.render("zipCodes/index");
});

module.exports = router;