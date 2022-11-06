import { model, models, Schema, Types } from "mongoose";

const fansSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "Users",
  },
  follows: {
    type: Types.ObjectId,
    ref: "Users",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

fansSchema.index({ user: 1, follows: 1 }, { unique: true });
export const Fans = models.Fans || model("Fans", fansSchema);
