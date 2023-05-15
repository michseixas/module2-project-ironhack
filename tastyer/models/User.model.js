const { Schema, model } = require("mongoose");

//Tastyer User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, //ask Yabel if necessary
    },
    password: {
      type: String,
      required: true,
    },
    recipeId: {
      type: [{type: Schema.Types.ObjectId, ref: "Recipe"}]
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
