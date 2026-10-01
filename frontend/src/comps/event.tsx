import { RustLogo,RustCrab } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo, GoGif } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { voteLanguages } from "../utils/votes.tsx";
import { X } from "lucide-react";
import type { VOTE } from "../types/vote.d.ts";

interface PROPS{
	openVote:boolean;
	vote:any;
	totalVotes:Array<VOTE>;
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
	const gifs:Record<string, React.ReactNode> = {
		"go": <GoGif />,
		"rust":<RustCrab />
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
				<h3 className="voteHeader">{ vote === null ? "What would you suggest to learn next?" :  "Total Votes" }</h3>
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
							<div className="voteBar" key={item.lang} >
								<div 
									className="voteBarContent" 
									style={{}}
								>
									{item.lang === vote.language && (
										<div className="voteGifContainer">
											<div className="voteGif">{gifs[item.lang]}</div>
										</div>
									)}
									<div 
										className="voteBarFill" 
										style={{ width: item.count > 0 ? `${Math.min(item?.count * 2, 100)}%` : "0%", backgroundColor:barColors[item.lang] }}
									>
										<div 
											className="voteCount"
											style={{ color: item.lang === vote.language ? "#ACD8A7" : "#212222"}}
										>
											{item.count}
										</div>
									</div>
								</div>
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
