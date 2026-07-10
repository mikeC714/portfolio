import stackService from "../service/stack.service.ts";
import { catchAsync } from "../utils/catchAsync.ts";
import { Response, Request } from "express";
import { Lang, Framework } from "../src/types/stack.ts";


export default{
	get:catchAsync(async(req:Request, res:Response) => {
		const results = await stackService.getStack(req.session.userId as string);	
		return res.status(200).json({ results });
	}),
	updateLang:catchAsync(async(req:Request<{},{},Lang>, res:Response) => {
		await stackService.updateLang(req.body);
		return res.status(200).json({ success:true });
	}),
	updateFramework:catchAsync(async(req:Request<{},{},Framework>, res:Response) => {
		await stackService.updateFramework(req.body);
		return res.status(200).json({ success:true });
	})
}
