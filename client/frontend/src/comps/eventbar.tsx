import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo } from "../assets/cpp.tsx"
import type { VoteBody } from "../pages/mainpage.tsx"

interface Props{
	vote: Array<VoteBody>,
	handleVote: (id:number) => void
}
type Lang = 'Rust' | 'GO' | 'Assembly' | 'Python' | 'Cpp';


export function EventBar({ vote, handleVote }:Props){
	const icons:Record<Lang, React.ReactNode> = {
		Rust: <RustLogo />,
		GO: <GoLogo />,
		Assembly: <WasmLogo />,
		Python: <PythonLogo />,
		Cpp: <CppLogo />
	}

	return(
		<div className="eventContainer">
			<div className="voteContainer">
			<h3>What to learn next </h3>
			{vote.map(item => 
				<div onClick={() => handleVote(item.id)}>
					{icons [item.lang]}
					<p>{item.counter}</p>
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
