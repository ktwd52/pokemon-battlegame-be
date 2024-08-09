import { Router } from "express";
import { getLeaderBoard, createUserScore, deleteLeaderBoard, getUserScore } from "../controllers/leaderboard.js";

const leaderboardRouter = Router();

leaderboardRouter.route("/").get(getLeaderBoard).post(createUserScore).delete(deleteLeaderBoard);

leaderboardRouter.route("/:username").get(getUserScore);

export default leaderboardRouter;
