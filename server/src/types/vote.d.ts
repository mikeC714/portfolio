type VOTE_TARGET = "rust" | "go" | "python" | "asm" | "cpp";

type VOTE_INPUT = {
	voted:boolean;
	language:string;
}

type VOTE_ROW = Record<string,{
	name:string;
	count:number
}>;

type VOTES = Array<VOTE_ROW>;


export { VOTES, VOTE_ROW, VOTE_TARGET, VOTE_INPUT };

