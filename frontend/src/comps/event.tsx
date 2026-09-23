import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { voteLanguages } from "../utils/votes.tsx";
import { X } from "lucide-react";

interface Props{
	vote:any;
	voteCount:any;
	handleVote: (lang:string) => void;
	handleClose:() => void;
	success:boolean;
	loading:boolean;
	isErr:boolean;
	err:Error | null
}
type Lang = 'Rust' | 'GO' | 'Assembly' | 'Python' | 'Cpp' | 'C';


export function EventBar({ vote, voteCount, handleVote, handleClose, loading, isErr, err, success }:Props){
	const icons:Record<Lang, React.ReactNode> = {
		"Rust": <RustLogo />,
		"GO": <GoLogo />,
		"Assembly": <WasmLogo />,
		"Python": <PythonLogo />,
		"Cpp": <CppLogo />,
		"C": <CppLogo />
	};
	const barColors:Record<string, string> = {
		"Rust":"#B7410E",
		"GO": "#00ADD8",
		"Assembly": "#A020F0",
		"Python": "#FFD343",
		"Cpp": "#659AD2",
		"C":"#659AD2" 
	}

	return(
		<div className="voteContainer">
			<h3 className="voteHeader">What would you suggest to learn next?</h3>
			{ ( vote === null || vote.language === "") ?(
				
				voteLanguages.map(item => (
					<div 
						className={`voteItem ${item.lang}`}
						onClick={() => handleVote(item.lang)}
					>
						{icons[item.lang as Lang]}
						{item.lang}
					</div>
				))
			): 
				<>
					{ voteCount.map((item:{ language:Lang, count:number }) => (
						<div className="voteCountDisplay"> 
							<div className="voteItem" key={item.language}>
								<span className="voteItemIcon">{icons[item.language]}- {item.count} </span>
								<div className="voteCountBar" style={{ width: vote.count, backgroundColor:barColors[item.language] }}></div>
							</div>	
						</div>
					))}
				</>
			}
			<span className="voteExit" onClick={handleClose}><X /></span>
		</div>
	)
}
