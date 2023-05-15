const { Schema, model } = require("mongoose");

//Comment Schema

const commentSchema = new Schema({
userId: { 
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},  
text: {
      type: String,
      required: true
    },
date: {
      type: Date,
      default: Date.now
    },

recipe: { // since each comment can only relate to one recipe, it's not an array
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    },
    //IMG to be insert
  })

module.exports = model('Comment', commentSchema);