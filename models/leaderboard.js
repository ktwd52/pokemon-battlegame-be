import { Schema, model } from "mongoose";
import { AutoIncrementID } from "@typegoose/auto-increment";
import { recalcScore } from "../middleware/recalcScore.js";

// Defining the MongoDB collection schema
const leaderboardSchema = new Schema(
  {
    _id: { type: Number },
    username: { type: String, required: [true, "Username is required"] },
    wins: { type: Number, required: [true, "Wins are required"], min: 0 },
    losses: { type: Number, required: [true, "Losses are required"], min: 0 },
    score: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  // using the given collection name and prevent the automatic plural form created by mongoose
  // when { _id: false } is used together with auto-inc it must be after collection otherwise plural form of collection will be used
  { collection: "leaderboard" }
);

// Apply the pre-save middleware
leaderboardSchema.plugin(AutoIncrementID, {}).pre("save", recalcScore);

// Add auto-incrementing id plugin
// leaderboardSchema;

export default model("Leaderboard", leaderboardSchema);
