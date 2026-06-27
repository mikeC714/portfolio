import { catchAsync } from "../utils/catchAsync.js";
import projectService from "../service/projects.service.js";
import { Project } from "../src/types/project.js"; 
import { Response, Request } from "express";

export default{
	create: catchAsync(async(req:Request, res:Response):Promise<void> => {
		const data = req.body;
		await projectService.uploadNewProject(req.session.userId as string, data);
		return res.status(200).json({ success: true }) as unknown as void;
	}),
	getAll: catchAsync(async(req:Request, res:Response):Promise<void> => {
		const projects = await projectService.getProjects(req.session.userId as string);
		return res.status(200).json({ projects }) as unknown as void;
	}),
	get: catchAsync(async(req:Request<{ projectId:Project["id"] }>, res:Response) => {
		const { projectId } = req.params;
		const project = await projectService.getOneProject(req.session.userId as string, projectId);
		return res.status(200).json({ project });
	}),
	delete: catchAsync(async(req:Request<{ projectId: Project["id"] }>, res:Response):Promise<void> => {
		const { projectId } = req.params;
		await projectService.deleteProject(req.session.userId as string, projectId);
		return res.status(200).json({ success: true }) as unknown as void;
	}),
	update: catchAsync(async(req:Request<{ projectId: Project["id"] }>, res:Response) => {
		const { projectId } = req.params;
		const project = await projectService.getOneProject(req.session.userId as string, projectId);
		await projectService.updateProject(req.session.userId as string, project);
		return res.status(200).json({ success: true });
	}),
}
