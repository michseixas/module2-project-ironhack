const express = require('express');
const router = express.Router();
const axios = require('axios');
const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/list',
  headers: {
    'X-RapidAPI-Key': '6516624676msh84b669094735db6p107d62jsn77af1d574a92',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  },
  params: {
    from: '0',
    size: '1',
  }
};
const Recipe = require('../models/Recipe.model')

/* GET index page */
router.get("/",  (req, res, next) => {
  res.render("index"); 
});


/* GET home page */
router.get("/home", (req, res, next) => {
  axios.request(options)
.then(response => {
  console.log('recipes', response.data.results[0].nutrition);
  res.render("home", {recipes: response.data.results}); 
})
.catch (err => {
  (console.log(err));
});
  });

/* GET recipeId page */
router.get("/recipeId", (req, res, next) => {
  res.render("recipe"); 
});

/* POST recipeId page */
router.post("/recipeId", (req, res, next) => {
  res.redirect("recipe"); 
});

/* GET aboutUs page */
router.get("/aboutUs", (req, res, next) => {
  res.render("aboutUs"); 
});

/* GET allRecipes page */
router.get("/allrecipes", (req, res, next) => {
  res.render("allrecipes"); 
});

/* GET Profile page */
router.get("/profile", (req, res, next) => {
  res.render("profile"); 
});





module.exports = router;
