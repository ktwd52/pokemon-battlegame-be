import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema({
  username: { type: String, required: [true, "Username is required"] },
  favoritePokemon: { type: Object },
  wins: { type: Number, default: 0 },
  loses: { type: Number, default: 0 },
});

export default model("Leaderboard", leaderboardSchema);
