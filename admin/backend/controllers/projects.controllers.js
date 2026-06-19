import { AppError } from "../middleware/error.middleware.js";
import { catchAsync } from "../utils/catchAsync.js";
import projectService from "../service/projects.service.js";
import projectsService from "../service/projects.service.js";


export default{
	create: catchAsync(async(req, res) => {
		const data = req.body;
		await projectService.uploadNewProject(req.session.userId, data);
		return res.status(200).json({ success: true });
	}),
	get: catchAsync(async(req, res) => {
		const projects = await projectsService.getProjects(req.session.userId);
		return res.status(200).json({ projects });
	}),
	delete: catchAsync(async(req, res) =>{
		const { projectId } = req.params;
		await projectService.deleteProject(req.session.userId, projectId);
		return res.status(200).json({ success: true })
	}),
	update: catchAsync(async(req, res) => {
		const { projectId } = req.params;
		await projectsService.updateProject(req.session.userId, projectId);
		return res.status(200).json({ success: true });
	}),
}
