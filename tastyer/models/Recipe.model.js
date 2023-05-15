const { Schema, model } = require("mongoose");

//Recipe Schema
const recipeSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    language: {
      type: String,
    },
    keywords: {
      type: String,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    nutrition: {
      type: String,
    },
    ingredients: {
      type: [String],
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    cook_time_minutes: {
      type: Number,
      required: true,
    },
    num_servings: {
      type: Number,
    },
    thumbnail_url: {
      type: String,
    },
    comment : [{ type: Schema.Types.ObjectId, ref: "Comment" }] //since each recipe allows more than 1 comment, it should be an array
},
{
  timestamps: true,
}
);

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;