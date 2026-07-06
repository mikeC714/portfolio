import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./auth/auth.routes.js";
import session from "express-session";
import redisStore from "./config/redis.config.js";


const app = express();
app.use("/api", authRouter);




























// TODO

app.use(session({
	store: redisStore,
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie:{
		secure: process.env.NODE_ENV === "production",
		httpOnly:true,
		sameSite:"strict",
		maxAge: 1000 * 60 * 30,
	}
}));

app.listen(process.env.PORT, () => console.log(`Server is running on PORT:${process.env.PORT}`));


export default app;
