const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/home", (req, res, next) => {
  res.render("home"); //reminder that this is a file reference, not a route reference
});

/* GET index page */
router.get("/", (req, res, next) => {
  res.render("index"); 
});

/* GET recipeId page */
router.get("/recipeId", (req, res, next) => {
  res.render("recipe"); 
});

/* GET aboutUs page */
router.get("/aboutUs", (req, res, next) => {
  res.render("aboutUs"); 
});

/* GET allRecipes page */
router.get("/allrecipes", (req, res, next) => {
  res.render("allrecipes"); 
});





module.exports = router;
