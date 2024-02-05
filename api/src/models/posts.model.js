import { Schema, model } from "mongoose";

import events from "events";
events.EventEmitter.defaultMaxListeners = Infinity;

const postDetailsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    picture_path: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

export default new model("posts", postDetailsSchema);
