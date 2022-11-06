import { model, models, Schema, Types } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: [validator.isEmail, "Please enter valid email address"],
  },
  resetToken: { type: String },
  update: { type: String },
  validEmail: { type: String, default: "not" },
  emailToken: { type: String },
});

export const Users = models.Users || model("Users", userSchema);
