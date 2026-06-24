export interface Project{
	id:string,
	title:string,
	msg:string,
	stack:Array<string>,
	link:string,
	img?:Buffer | null,
}
