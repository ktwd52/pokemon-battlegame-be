import leaderboard from "../models/leaderboard.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import mongoose from "mongoose";

export const getLeaderBoard = asyncHandler(async (req, res) => {
  const LeaderBoard = await leaderboard.find();
  // .populate("username", "wins", "losses");
  res.status(200).json(LeaderBoard);
});

export const createUserScore = asyncHandler(async (req, res) => {
  const { username, wins, losses } = req.body;

  if (!username || wins == null || losses == null) {
    throw new ErrorResponse("Please provide all required fields", 400);
  }

  // Find the user in the leaderboard
  let user = await leaderboard.findOne({ username });

  if (!user) {
    // If user doesn't exist, create a new record
    user = await leaderboard.create({ username, wins, losses });
    await user.save();
    return res.status(201).json(user);
  } else {
    // If user exists, update the record
    user.wins = wins;
    user.losses = losses;
    user.updatedAt = Date.now();
    await user.save();
    return res.status(200).json(user); // Updated status code to 200 for successful update
  }
});

// Delete all leaderboard entry and set id counter back to 0 -> send DELETE request to Server with JSON body: { "delete_leaderboard": "yes" }
export const deleteLeaderBoard = asyncHandler(async (req, res) => {
  const { delete_leaderboard } = req.body;

  if (delete_leaderboard !== "yes") {
    return res
      .status(400)
      .json({ message: "Invalid request to delete leaderboard" });
  }

  const dellb = await leaderboard.deleteMany({}); // returns deletedCount: 1 when deleted 0 when empty.

  const delic = await mongoose.connection
    .collection("identitycounters")
    .deleteMany({}); // Ensure you replace 'identitycounters' with the actual collection name if different.

  if (dellb.deletedCount === 0 && delic.deletedCount === 0) {
    throw new ErrorResponse("Leaderboard is already empty", 404);
  }

  res.status(200).json({
    message: "Leaderboard deleted successfully",
    deletedLeaderboardCount: dellb.deletedCount,
    deletedIdentityCountersCount: delic.deletedCount,
  });
});
