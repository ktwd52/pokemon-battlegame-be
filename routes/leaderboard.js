import { Router } from "express";
import {
  getLeaderBoard,
  createUserScore,
  deleteLeaderBoard,
} from "../controllers/leaderboard.js";

const leaderboardRouter = Router();

leaderboardRouter
  .route("/")
  .get(getLeaderBoard)
  .post(createUserScore)
  .delete(deleteLeaderBoard);

export default leaderboardRouter;
