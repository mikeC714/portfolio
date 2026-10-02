import { useQueries } from "@tanstack/react-query";
import { apiFetch } from "../utils/apiFetch.tsx";


const PROJECTS = ["logger", "field-hq", "machine2pi", "spider"] as const;
export function useCommits(){
	const res = useQueries({
		queries: PROJECTS.map((p) => ({
			queryKey:["commits", p],
			queryFn: () =>  apiFetch(`${import.meta.env.VITE_API}/api/commits`, "GET", null, { repo: p }),
			staleTime:60 * 60 * 24 * 1000,
		})),
	})

	return PROJECTS.map((project, i) => ({
		project,
		commitData: res[i].data,
		commitLoading: res[i].isLoading,
		commitErr: res[i].error
	}));
}
