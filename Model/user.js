const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = mongoose.Schema({
  userId: {
    type: Number,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.plugin(AutoIncrement, { inc_field: "userId" });

var user = mongoose.model("users", userSchema);
module.exports = user;
