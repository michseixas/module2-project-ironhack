const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyparser = require("body-parser");
const transporter = require("../config/transporter.config");
const templates = require("../templates/template");

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
const Subscriber = require("../models/Subscriber.model");

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



/*GET - start of route Nodemailer*/

router.post("/send-email", (req, res, next) => {
  let { email, subject, message } = req.body;
 
  // Send an email with the information we got from the form
  transporter.sendMail({
    from: `"Tastyer Team" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: subject,
    text: message,
    html: templates.templateExample(message),
  })
  .then((info) => res.render("message", { email, subject, message, info }))
  .catch((error) => console.log(error));
});

/*end of route Nodemailer*/




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

/* POST subscribe*/
router.post("/subscribe", (req, res, next) => { 
  const {email} = req.body;
  if (email === "") { //checks if email input is empty
      res.status(400).render("subscribe-error", {
        errorMessage:
          "Please provide your email.",
      });
      return;
    }

    let data = {
      //Define data obj
      errorMessage: "There is information missing!",
      email: "",
    };

    Subscriber.find({ email }) //returns an array of subscribes with email maching this email
      .then((subscriber) => {
        if (subscriber.length != 0) { //checks if email exists
          data.errorMessage = "Subscriber already exists";
          res.render("subscribe-error", data);
          return;
        }
        Subscriber.create({email}) //creates subscriber
          .then((subscriber) => {
            res.render("subscribe-ok");
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              res
                .status(500)
                .render("subscribe-error", { errorMessage: error.message });
            } else if (error.code === 11000) {
              res.status(500).render("subscribe-error", {
                errorMessage:
                  "Subscriber email needs to be unique. Provide a valid email.",
              });
            } else {
              next(error);
            }
          });
      })
      .catch(next);
  }
);

router.post('/send-email', (req, res, next) => {
  const { email, subject, message } = req.body;
  
  res.render('email-message', { email, subject, message })
});



module.exports = router;
