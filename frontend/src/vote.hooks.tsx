import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { VOTE_METHODS, VOTE_PROPS } from "./types/vote.d.ts";


async function apiFetch(url = "", method = "GET", body?:any){
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

export function useVotes():VOTE_METHODS{
	const queryClient = useQueryClient();

	function useGet({ setVotes }:VOTE_PROPS){
		const { data, isPending, isError, error } = useQuery({
			queryKey:["votes"],
			queryFn: async() => await apiFetch(`${import.meta.env.VITE_API}/votes-get`),
		});

		useEffect(() => {
			if(data) setVotes((prev:any) => (prev.length === 0 ? data: prev))
		}, [data, setVotes]);

		return {
			getLoading: isPending,
			getIsErr: isError,
			getErr: error
		}
	}
	function useUpdate(){
		const { mutate, isPending, isSuccess, isError, error } = useMutation({
			mutationFn: async(body) => await apiFetch(`${import.meta.env.VITE_API}/votes`, "PUT", body),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey:["votes"] })				
			},
			onError: () => {
				throw new Error(`Network Response Failed.`);
			}
		});
		return {
			mutate,
			updateLoading: isPending,
			updateSuccess: isSuccess, 
			updateIsErr: isError,
			updateErr: error
		}
	}

	return {
		get:useGet,
		update:useUpdate

	}
};
