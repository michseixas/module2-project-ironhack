const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("home"); //reminder that this is a file reference, not a route reference
});



module.exports = router;
