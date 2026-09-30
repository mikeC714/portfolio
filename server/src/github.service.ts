export class GithubService{
	req = async(repo:string) => {
		if(!repo) throw new Error("Github repo is undefined");

		const owner = process.env.GITHUB;
		const token = process.env.GITHUB_TOKEN;
			
		try{
			const res = await fetch(`https://api.github.com/repos/${owner}/${encodeURIComponent(repo)}/commits`,{
				headers:{
					Authorization:`Bearer ${token}`,
					Accept: "application/vnd.github+json",
						"X-GitHub-Api-Version": "2022-11-28",
				},
			});

			 if (!res.ok) {
			    const body = await res.json().catch(() => null);
			    throw new Error(`GitHub ${res.status}: ${body?.message ?? res.statusText}`);
			  }


			return res.json();
		}catch(e:any){
			throw e;
		}

	} 
}

