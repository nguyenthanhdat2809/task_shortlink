const express = require("express");
const router = express.Router();

const { postUrl, index } = require("../controllers/url.controller");

// @route POST /api/url/shorten
// @desc Create short Url

router.get("/geturl", index);
router.post("/url/shorten", postUrl);

module.exports = router;
