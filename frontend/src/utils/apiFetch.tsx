export async function apiFetch(url:string, method = "GET", body?:any | null, params?:any){
	if(params){
		 const queryStr = new URLSearchParams(params).toString()
		 url = `${url}?${queryStr}`;
		 console.log("URL WITH PARAMS", url);
	}
	try{
		return await fetch(url,{
			method,
			headers:{
				"Content-Type":"application/json"
			},
			body: body ? JSON.stringify(body) : null,
		}).then((res:any) => {
			if(!res.ok){
				throw new Error("Network Response failed");
			};
			return res.json()	
		});
	}catch(e){
		throw e;
	}
};

