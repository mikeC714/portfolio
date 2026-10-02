type STATUS = "good" | "down" | "pending" ;

export type PROJECT = {
	img:any;
	bio:string;
	status:STATUS;
	languages:string | Array<string>;
	title:string;
	repoName:string;
	src:string;
	link:string;
	commit:any;
	commitLoading:boolean;
	commitErr:Error | null;
	openProject:(title:string) => void;
}

