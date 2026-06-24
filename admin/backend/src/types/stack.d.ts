interface Framework{
	lang_id: string,
	id:string,
	name:string,
	status:string,
}
interface Lang{
	id:string,
	name:string,
	status:string,
	frameworks: Array<Framework>,
	projectNum:number,
}

interface Stack{
	id:string,
	lang:Array<Lang>	
}

export{Stack, Lang, Framework}
