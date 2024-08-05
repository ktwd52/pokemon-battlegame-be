import express from "express";

import errorHandler from "./middleware/errorHandler.js";
import usersRouter from "./routes/users.js";
import leaderboardRouter from "./routes/leaderboard.js";
import "./db/mongoose.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/leaderboard", leaderboardRouter);

app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
