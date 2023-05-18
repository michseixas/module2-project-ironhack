const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyparser = require("body-parser");

const options = {
  method: "GET",
  url: "https://tasty.p.rapidapi.com/recipes/list",
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
  params: {
    from: "0",
    size: "6",
  },
};
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");


const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

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
      response.data.results.forEach((element, k) => {});
      res.render("home", { recipes: response.data.results });
    })
    .catch((err) => {
      console.log(err);
    });
});


// /* GET allRecipes page */
// router.get("/allrecipes", (req, res, next) => {
//   res.render("allrecipes");
// });

// /* GET Profile page */
// router.get("/allrecipes", (req, res, next) => {
//   res.redirect("/profile");
// });

// GET /profile/:username
router.get("/profile", isLoggedIn, (req, res, next) => {
  
  console.log("req.session.currentuser id----------:", req.session.currentUser._id);
  // const objectId = objectId()

  User.findById(req.session.currentUser._id)
    .then((user) => {
      console.log("user:", user);
      res.render("profile", user);
    })
    .catch((err) => next(err));
});

// GET userprofile/edit 
router.get("/profile/:username/edit", (req, res, next) => {
  User.findById(req.session.currentUser._id) //find user by id
    .then((result) => {
      console.log("Result:", result);
      res.render("edit-userprofile", { user: result }); //access user and display users data
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST userprofile/edit (update user profile with new data)
router.post("/profile/:username/edit", (req, res, next) => {
  // let {username, email, city, bio, photo} = req.body;
  console.log("holaaa req.body", req.body);
  User.findByIdAndUpdate(req.session.currentUser._id, req.body) //update user profile with data form "req.body" then return new result
    .then((result) => {
      console.log(result);
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST DeleteUserById (remove the user profilById)
router.post("/profile/:username/delete", (req, res, next) => {
  console.log("deleteeee method")
  User.findByIdAndRemove(req.session.currentUser._id)
    .then((result) => {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).render("auth/logout", { errorMessage: err.message });
          return;
        }
        res.redirect("/auth/login");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* GET aboutUs page */
router.get("/aboutUs", (req, res, next) => {
  res.render("aboutUs");
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
