import mongoose from "mongoose";
import { Schema, model, connect } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  //   email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const TagSchema = new Schema({
  title: { type: String, required: true },
});

const LinkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const User = model("User", UserSchema);
const Content = model("Content", ContentSchema);
const Tag = model("Tag", TagSchema);
const Link = model("Link", LinkSchema);
