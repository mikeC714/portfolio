export class GithubService{
	private socket:any;
	constructor(socket:any){
		this.socket = socket;
	}
	
	verifyEvent = (headers:string) => {
		if(!headers) return false; 

		//decrypt
			
		//verify match
		if(headers !== process.env.GITHUB_SECRET) return false;

		return true;
	};	

	parse = async(req:Request | any) => {
		let payload = {};
		const eventType = req.headers("x-github-event");

		if(eventType === "push"){
			let body = req.body;

			if(body.repository.private) return;
			
			payload = {
				 repoName: body.repository.full_name,
				 repoUrl: body.repository.head_commit?.url,
				 langs: body.repository.language,
				 bio: body.repository.description
			};
		};
		
		this.socket.emit("repo", JSON.stringify(payload));
	}
}

