import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentTypes = ["image", "video", "audio", "article"];

const contentSchema = new Schema({
  // type: { type: String, enum: contentTypes, required: true },
  type: { type: String },
  title: { type: String, required: true },
  link: { type: String },
  description: { type: String, default: "" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // validate: async function (value: any) {
    //   const user = await User.findById(value);
    //   if (!user) {
    //     throw new Error("User not found");
    //   }
    // },
  },
});

const tagSchema = new Schema({
  title: { type: String, required: true },
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
});

const User = model("User", userSchema);
const Content = model("Content", contentSchema);
const Tag = model("Tag", tagSchema);
const Link = model("Link", linkSchema);

export { Tag, User, Content, Link };
