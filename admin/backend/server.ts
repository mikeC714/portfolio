import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./auth/auth.routes.js";
import session from "express-session";


const app = express();

app.use("/api", authRouter);




























// TODO

app.use(session({
	resave: false
}))

app.listen(process.env.PORT, () => console.log(`Server is running on PORT:${process.env.PORT}`));

