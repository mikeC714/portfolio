import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiFetch } from "../utils/apiFetch.tsx";
import type { VOTE_METHODS, VOTE_PROPS } from "../types/vote.d.ts";

export function useVotes({ setTotalVotes, setVote }:VOTE_PROPS):VOTE_METHODS{
	const queryClient = useQueryClient();

	function useGet(){
		const { data, isPending, isError, error } = useQuery({
			queryKey:["votes"],
			queryFn: async() => await apiFetch(`${import.meta.env.VITE_API}/api/votes-get`),
		});
		
		useEffect(() => {
			if(data?.votes) setTotalVotes((prev:any) => (prev.length === 0 ? data?.votes : prev))
		}, [data, setTotalVotes, isPending]);

		return {
			getLoading: isPending,
			getIsErr: isError,
			getErr: error
		}
	}

	function useUpdate(){
		const { mutate, isPending, isSuccess, isError, error } = useMutation({
			mutationFn: async(body) => await apiFetch(`${import.meta.env.VITE_API}/api/vote`, "PUT", { vote: body }),
			onSuccess: async(_, body) => {
				setVote({ voted:true, language:body })
				 return await queryClient.resetQueries({ queryKey:["votes"] })				
			},
			onError: (e:any) => {
				console.error(e);
				console.error(error);
				console.error(`Network Response Failed.`, error);
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
