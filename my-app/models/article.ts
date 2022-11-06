import { model, models, Schema, Types } from "mongoose";
import DOMPurify from "isomorphic-dompurify";

const articleSchema = new Schema({
  title: String,
  author: {
    type: Types.ObjectId,
    ref: "Users",
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        const regex =
          /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  view_count: Number,
  content: String,
  summary: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  word_count: Number,
});

articleSchema.pre("validate", function (next) {
  if (this.content) {
    this.content = DOMPurify.sanitize(this.content);
  }

  if (this.summary) {
    this.summary = DOMPurify.sanitize(this.summary);
  }

  next();
});

export const Articles = models.Articles || model("Articles", articleSchema);
