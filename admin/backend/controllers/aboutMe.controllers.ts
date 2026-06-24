import { catchAsync } from "../utils/catchAsync.js";
import storeAboutMe from "../service/aboutMe.service.js";
import AboutMe from "../src/types/aboutme.js";
import { Response, Request } from "express";


export default{
	setAndGet: catchAsync(async(req:Request<{},{}, AboutMe>, res:Response):Promise<void> => {
		const data = await storeAboutMe(req.session.userId as string, req.body);
		return res.status(200).json({ data }) as unknown as void
	})

}
