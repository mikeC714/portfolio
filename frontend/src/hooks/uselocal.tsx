import { useState, useEffect } from "react";

export function useLocalStorage(key:string = "vote", value:{ voted:boolean, language:string }){
	const [voted, setVoted] = useState<{ voted:boolean, language:string }>(() => {
		try{
			const cache = window.localStorage.getItem(key);
			return cache !== null ? JSON.parse(cache) : null;
		}catch(e){
			return value
		}
	});

	useEffect(() => {
		try{
			window.localStorage.setItem(key, JSON.stringify(voted));
		}catch(e){ }
	}, [voted])

	return [voted, setVoted]
}
