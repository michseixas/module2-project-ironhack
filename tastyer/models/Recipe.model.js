const { Schema, model } = require("mongoose");

//Recipe Schema
const recipeSchema = new Schema({
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
    },
    comment : [{ type: Schema.Types.ObjectId, ref: "Comment" }] //since each recipe allows more than 1 comment, it should be an array
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;