import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { voteLanguages } from "../utils/votes.tsx";
import { X } from "lucide-react";
import type { LANG, VOTE } from "../types/vote.d.ts";

interface PROPS{
	openVote:boolean;
	vote:any;
	totalVotes:Array<{ language:LANG, count:number }>;
	handleVote: (lang:string) => void;
	handleClose:() => void;
	updateSuccess:boolean;
	updateLoading:boolean;
	updateIsErr:boolean;
	updateErr:Error | null
	getLoading:boolean;
	getIsErr:boolean;
	getErr:Error | null;
}


export function EventBar({ openVote, vote, totalVotes, handleVote, handleClose, updateLoading, updateIsErr, updateErr, getLoading, getIsErr, getErr }:PROPS){
	const icons:Record<string, React.ReactNode> = {
		"rust": <RustLogo />,
		"go": <GoLogo />,
		"assembly": <WasmLogo />,
		"python": <PythonLogo />,
		"cpp": <CppLogo />,
		"c": <CLogo />
	};
	const barColors:Record<string, string> = {
		"rust":"#B7410E",
		"go": "#00ADD8",
		"assembly": "#A020F0",
		"python": "#FFD343",
		"cpp": "#659AD2",
		"c":"#659AD2" 
	}

	console.log(totalVotes)

	return(
		<div className={`eventContainer ${openVote ? "" : "close"}`}>
			<div className="voteContainer">
				{
					updateLoading && (
						<div>spinner</div>
					)
				}
				{
					updateIsErr || updateErr !== null && (
						<div>{updateErr.message}</div>
					)
				}
				{
					getLoading && (
						<div>spinner</div>
					)	
				}
				{
					getIsErr || getErr !== null && (
						<div>{getErr?.message}</div>
					)	
				}
				<h3 className="voteHeader">What would you suggest to learn next?</h3>
				{ vote === null || vote.language === "" ? (
					voteLanguages.map(item => (
						<div 
							key={item.name}
							className={`voteItem ${item.lang}`}
							onClick={() => handleVote(item.lang)}
						>
							{icons[item.lang]}
							{item.name}
						</div>
					))
				):( 
					<div className="totalVoteContainer">	
						{ totalVotes?.map((item:any) => (
							<div className="voteBar" 
								key={item.lang} 
								style={{ 
									width: item.count > 0 ? `(${item?.count} * 2) %` : "1%",
									backgroundColor: vote.lang === item.lang ? "green" : barColors[item.lang] 
								}} 
							>
								<div className="voteCount">{item.count}</div>
								<span className="voteItemIcon"></span>
							</div>	
						))}
					</div>
				  )
				}
				<span className="voteExit" onClick={handleClose}><X /></span>
			</div>
		</div>
	)
}
