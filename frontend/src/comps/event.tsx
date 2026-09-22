
import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import type { VOTE } from "../types/vote.d.ts";

interface Props{
	vote: Array<VOTE>;
	handleVote: (lang:string) => void;
	success:boolean;
	loading:boolean;
	isErr:boolean;
	err:Error | null
}
type Lang = 'Rust' | 'GO' | 'Assembly' | 'Python' | 'Cpp';


export function EventDropDown({ vote, handleVote, loading, isErr, err, success }:Props){
	const icons:Record<Lang, React.ReactNode> = {
		Rust: <RustLogo />,
		GO: <GoLogo />,
		Assembly: <WasmLogo />,
		Python: <PythonLogo />,
		Cpp: <CppLogo />
	};

	return(
		<div className="eventContainer">
			{
				isErr && (
					<div className="voteContainer">
						<h3>Sorry failed to fetch todays event. :(</h3>
					</div>
				)

			}	
			{
				loading && (
					<div className="voteContainer">
						<div className="voteLoadingContainer">
							<p>Loading</p> <span>...</span>
						</div>
					</div>
				)

			}	

			<div className="voteContainer">
			<h3>What to learn next </h3>
			{vote.map(item => 
				<div 
					onClick={() => handleVote(item.lang)}
					aria-disabled={success}
				>
					{icons[item.lang as Lang]}
					<p>{item.count}</p>
				</div>
			)}
			</div>
			<div className="currContainer">
			<h3>News</h3>	
				<div className="currContainerContent">
				</div>
			</div>
		</div>
	)
}
