const { Schema, model } = require("mongoose");

//Tastyer User Schema
const recipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    ingredients: {
      type: [String],
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    prepTime: {
      type: Number,
      required: true
    },
    cookTime: {
      type: Number,
      required: true
    },
    createdAt: { //Ask Yabel if this will require more work !!! hahaha
      type: Date,
      default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;