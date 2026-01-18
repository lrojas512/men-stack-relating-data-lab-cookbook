const mongoose = require("mongoose");


const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    min: 0,
  }
}, {
  timestamps: true
})
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: {
    type: [foodSchema],
    default: []
  }
});

const User = mongoose.model("User", userSchema);

userSchema.pre('save', function (next) {
  const docToBeSaved = this
  if (docToBeSaved.username) {
    docToBeSaved.username = docToBeSaved.username[0].toUpperCase() + docToBeSaved.username.slice(1);
  }
  next();
});

module.exports = User;