
type LANG = 'rust' | 'go' | 'assembly' | 'python' | 'cpp' | 'c';
type VOTE = {
	lang:Lang;
	count:number
};

type VOTE_PROPS = {
	setTotalVotes: React.Dispatch<React.SetStateAction<Array<VOTE>>>
	setVote:any
}

type VOTE_METHODS = { 
	get: () => {
		getLoading:boolean,
		getIsErr:boolean,
		getErr:Error | null,
	},
	update: () => {
		mutate:any,
		updateSuccess:boolean,
		updateLoading:boolean,
		updateIsErr:boolean,
		updateErr:Error | null,
	}
};

export { VOTE, LANG, VOTE_PROPS, VOTE_METHODS }
