const { Schema, model } = require("mongoose");

//Subscriber Schema

const subscriberSchema = new Schema({
  email: {
    type: String,
  },
});

module.exports = model("Subscriber", subscriberSchema);
