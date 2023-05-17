const { Schema, model } = require("mongoose");

//Comment Schema

const commentSchema = new Schema({
author: { 
  type: String,
  ref: 'User'
},  
comment: {
      type: String,
      required: true
    },
date: {
      type: Date,
      default: Date.now
    },
recipeId: {
  type: String,
},

// recipe: { // since each comment can only relate to one recipe, it's not an array
//       type: Schema.Types.ObjectId,
//       ref: 'Recipe',
//       required: true,
//     },
//     //IMG to be insert
  })

module.exports = model('Comment', commentSchema);