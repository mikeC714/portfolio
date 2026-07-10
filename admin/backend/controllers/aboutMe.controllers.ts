import { catchAsync } from "../utils/catchAsync.ts";
import { db, test_db } from "../config/postgres.config.ts";
import { AboutMeService } from "../service/aboutMe.service.ts";
import AboutMe from "../src/types/aboutme.ts";
import { Response, Request } from "express";
const aboutService = new AboutMeService(test_db)

export default{
	setAndGet: catchAsync(async(req:Request<{},{}, AboutMe>, res:Response):Promise<void> => {
		console.log("USER ID FROM ABOUT ME",req.session.userId);
		const data = await aboutService.storeAboutMe(req.session.userId as string, req.body);
		return res.status(200).json({ data }) as unknown as void
	}),
	update: catchAsync(async(req:Request<{},{}, AboutMe>, res:Response) => {
		 await aboutService.update(req.session.userId as string, req.body)
		const data = await aboutService.storeAboutMe(req.session.userId as string, req.body);
		return res.status(200).json({ data }) as unknown as void
	}),
}
