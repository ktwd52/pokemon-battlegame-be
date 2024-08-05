import { Router } from "express";

const usersRouter = Router();

usersRouter.route("/").get().post().get().put().delete();

export default usersRouter;
