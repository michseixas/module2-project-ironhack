const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyparser = require('body-parser')

const options = {
  method: "GET",
  url: "https://tasty.p.rapidapi.com/recipes/list",
  headers: {
    "X-RapidAPI-Key": "6516624676msh84b669094735db6p107d62jsn77af1d574a92",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
  params: {
    from: "0",
    size: "6",
  },
};
const Recipe = require("../models/Recipe.model");

/* GET index page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET home page */
router.get("/home", (req, res, next) => {
  options.url = "https://tasty.p.rapidapi.com/recipes/list";
  options.params = {
    from: "22", //selection of single recipes, not multiple recipes!! 
    size: "6",
  };
  console.log('option.params!!!!!!!!!!!!', options.params)

  axios
    .request(options)
    .then((response) => {
      // console.log("recipes", response.data.results);
      response.data.results.forEach((element, k) => {
        console.log(`${k} name`, element.name)
      });
      res.render("home", { recipes: response.data.results });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* GET recipeId page */
router.get("/:recipeId", (req, res, next) => {
  options.url = `https://tasty.p.rapidapi.com/recipes/get-more-info`;
  options.params = { id: req.params.recipeId }
  console.log('option.params!!!!!!!!!!!!', options.params)
  axios
    .request(options)
    .then((response) => {
      console.log("recipe---------------", response.data);
      res.render("recipe", { recipe: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* POST recipeId page */
router.post("/recipe/:recipeId", (req, res, next) => {
  const { author, comment, image } = req.body;
  const newComment = {
    author,
    comment,
    image,
  };

  Recipe.findByIdAndUpdate(
    req.params.recipeId,
    { $push: { comments: newComment } },
    { new: true }
  )
    .then((recipe) => {
      // Redirect back to the recipe page
      res.redirect(`/recipe/${recipe._id}`);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
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
