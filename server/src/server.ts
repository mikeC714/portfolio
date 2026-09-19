import dotenv from "dotenv";
dotenv.config()
import express from "express";
import { router as voteRouter } from "./vote.route.ts";

const app = express();





app.use(voteRouter);





app.listen(process.env.PORT, () => {
	console.log(`App is running on PORT:${process.env.PORT}`);
})
