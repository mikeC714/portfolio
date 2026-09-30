import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { voteRouter } from "./vote.route.ts";
import { githubRouter } from "./github.route.ts";

const app = express();

app.use(cors({ origin:process.env.CLIENT }))
app.use(helmet());
app.use(express.json())
app.use(githubRouter);
app.use(voteRouter);

app.listen(process.env.PORT, () => {
	console.log(`App is running on PORT:${process.env.PORT}`);
})
