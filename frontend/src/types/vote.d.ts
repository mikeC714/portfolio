type VOTE = {
	lang:string;
	count:number
};

type VOTE_PROPS = {
	setVotes: React.Dispatch<React.SetStateAction<Array<VOTE>>>
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

export { VOTE, VOTE_PROPS, VOTE_METHODS }
