import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: [true, "Title is required"] },
  password: { type: String, required: [true, "Content is required"] },
  roaster: [
    {
      pokemonId: { type: Object },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
