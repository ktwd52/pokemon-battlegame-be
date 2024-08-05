import { Router } from "express";

const leaderboardRouter = Router();

leaderboardRouter.route("/").get().post();

export default leaderboardRouter;
