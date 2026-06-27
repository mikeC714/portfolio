import { catchAsync } from "../utils/catchAsync.js";
import aboutService from "../service/aboutMe.service.js";
import AboutMe from "../src/types/aboutme.js";
import { Response, Request } from "express";


export default{
	setAndGet: catchAsync(async(req:Request<{},{}, AboutMe>, res:Response):Promise<void> => {
		const data = await aboutService.storeAboutMe(req.session.userId as string, req.body);
		return res.status(200).json({ data }) as unknown as void
	}),
	update: catchAsync(async(req:Request<{},{}, AboutMe>, res:Response) => {
		 await aboutService.update(req.session.userId as string, req.body)
		 return res.status(200).json({ success:true });
	})
}
