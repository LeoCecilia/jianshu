import { model, models, Schema, Types } from "mongoose";

const likeSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "Users",
  },
  article: { type: Types.ObjectId, ref: "Article" },
  articleAuthor: { type: Types.ObjectId, ref: "Users" },
});

likeSchema.index({ user: 1, article: 1, articleAuthor: 1 }, { unique: true });
export const Likes = models.Likes || model("Likes", likeSchema);
