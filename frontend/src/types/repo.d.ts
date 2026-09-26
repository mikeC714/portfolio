export type REPO = {
	repoName:string;
	repoUrl:string;
	langs:string | Array<string>;
	bio:string;  
}
type JSON<T> = string & { readonly __brand: T };
type SOCKET_DATA = JSON<REPO>;
type Section = "Background" | "Hobbies" | "Philosophy";
