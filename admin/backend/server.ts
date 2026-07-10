import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Request, Response } from "express";
import { AppError } from "./middleware/error.middleware.ts";
import authRouter from "./auth/auth.routes.ts";
import projectRouter from "./routes/projects.routes.ts";
import stackRouter from "./routes/stack.routes.ts";
import aboutMeRouter from "./routes/aboutMe.routes.ts"; 
import session from "express-session";
import { redisStore } from "./config/redis.config.ts";
import cors from "cors";
import helmet from "helmet";
import { serverLogger } from "./config/logger.config.ts";


const app = express();
app.use(session({
	store: redisStore,
	secret:process.env.SESSION_SECRET as string,
	resave: false,
	saveUninitialized: false,
	cookie:{
		secure: process.env.NODE_ENV === "production",
		httpOnly:true,
		sameSite:"strict",
		maxAge: 999 * 60 * 30,
	}
}));
app.use(express.json());


app.use("/api", authRouter);
app.use("/api", aboutMeRouter);
app.use("/api", projectRouter);
app.use("/api", stackRouter);


app.use((err: any, req:Request, res:Response) => {
	let statusCode = 500;
	if(err instanceof AppError){
		return res.status(err.statusCode).json({ error: err.message }); 
	}
	return res.status(statusCode || err.statusCode).json({ error: err.message });
})



app.listen(process.env.PORT, () => console.log(`Server is running on PORT:${process.env.PORT}`));


export default app;
