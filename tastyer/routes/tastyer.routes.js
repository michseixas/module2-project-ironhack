const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyparser = require("body-parser");

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
const Comment = require("../models/Comment.model");

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

  axios
    .request(options)
    .then((response) => {
      // console.log("recipes", response.data.results);
      response.data.results.forEach((element, k) => {
      });
      res.render("home", { recipes: response.data.results });
    })
    .catch((err) => {
      console.log(err);
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
  res.render("profile2");
});

/* GET recipeId page */
router.get("/:recipeId", (req, res, next) => {
  options.url = `https://tasty.p.rapidapi.com/recipes/get-more-info`;
  options.params = { id: req.params.recipeId };
  console.log("option.params!!!!!!!!!!!!", options.params);
  const data = {};
  axios
    .request(options)
    .then((response) => {
      console.log("recipe---------------", response.data);
      // res.json({ recipe: response.data });
      data.recipe = response.data;
      return Comment.find({ recipeId: req.params.recipeId });
    })
    .then((comments) => {
      data.comments = comments;
      res.render("recipe", data);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* POST recipeId page */
router.post("/recipe/:recipeId", (req, res, next) => {
  console.log("hi");
  // Extracting data from the request body
  const { author, comment } = req.body;
  console.log(req.body);
  const newComment = {
    author,
    comment,
    recipeId: req.params.recipeId,
  };
  Comment.create(newComment)
    .then((comment) => {
      res.redirect("/" + req.params.recipeId);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
