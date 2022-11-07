import { model, models, Schema, Types } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  resetToken?: string;
  update?: string;
  validEmail?: string;
  emailToken?: string;
  imageUrl?: string;
}

const userSchema = new Schema<UserType>({
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
