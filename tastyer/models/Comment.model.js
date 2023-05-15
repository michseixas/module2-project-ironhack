const { Schema, model } = require("mongoose");

//Comment Schema

const commentSchema = new Schema({
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
    }
  })

module.exports = model('Comment', commentSchema);