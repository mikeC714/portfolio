import dotenv from "dotenv";
dotenv.config()
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { router as voteRouter } from "./vote.route.ts";
import { router as githubRouter } from "./github.route.ts";

const app = express();
const server = createServer(app);
export const io = new Server(server, {

	cors:{
		origin:process.env.CLIENT_URL
	}
});

io.on("connection", (socket) => {
	socket.on("disconnect", (reason) => {
		// write to logger
	})
	io.emit("connected", true);
});


app.use(voteRouter);
app.use(githubRouter);


app.listen(process.env.PORT, () => {
	console.log(`App is running on PORT:${process.env.PORT}`);
})
