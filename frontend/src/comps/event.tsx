
import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { voteLanguages } from "../utils/votes.tsx";
import type { VOTE } from "../types/vote.d.ts";

interface Props{
	vote: Array<VOTE>;
	handleVote: (lang:string) => void;
	success:boolean;
	loading:boolean;
	isErr:boolean;
	err:Error | null
}
type Lang = 'Rust' | 'GO' | 'Assembly' | 'Python' | 'Cpp' | 'C';


export function EventBar({ vote, handleVote, loading, isErr, err, success }:Props){
	const icons:Record<Lang, React.ReactNode> = {
		"Rust": <RustLogo />,
		"GO": <GoLogo />,
		"Assembly": <WasmLogo />,
		"Python": <PythonLogo />,
		"Cpp": <CppLogo />,
		"C": <CppLogo />
	};

	return(
		<div className="voteContainer">
			<h3 className="voteHeader">What would you suggest to learn next?</h3>
			{voteLanguages.map(item => 
				<div 
					className={`voteItem ${item.lang}`}
					onClick={() => handleVote(item.lang)} >
					{icons[item.lang as Lang]}
					{item.lang}
				</div>
			)}
		</div>
	)
}
