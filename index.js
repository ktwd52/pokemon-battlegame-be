import express from "express";

import errorHandler from "./middleware/errorHandler.js";
import usersRouter from "./routes/users.js";
import leaderboardRouter from "./routes/leaderboard.js";
import cors from "cors";
import "./db/mongoose.js";

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/leaderboard", leaderboardRouter);

app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

app.use(errorHandler);

app.listen(port, host, () =>
  console.log(`Server is running at http://${host}:${port}`)
);
