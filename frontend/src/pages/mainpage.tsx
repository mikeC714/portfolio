import { useState, useEffect } from "react";
import { NavBar } from "../comps/navbar.tsx";
import { EventDropDown } from "../comps/event.tsx";
import { Link } from "react-router-dom";
import { useVotes } from "../vote.hooks.tsx";
import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { JsLogo, TsLogo, FastifyLogo, ReactLogo, NodeLogo } from "../assets/js.tsx";
import { PostgresLogo, SqliteLogo } from "../assets/sql.tsx";
import type { VOTE } from "../types/vote.d.ts";

export function MainPage(){
	const { get, update } = useVotes();
	const [votes, setVotes] = useState<VOTE[]>([]);
	const { getLoading, getIsErr, getErr } = get({ setVotes });
	const { mutate, updateSuccess, updateLoading, updateIsErr, updateErr } = update();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [selectedVote, setSelectedVote] = useState<null | string>(null);
	const [showPointer, setShowPointer] = useState<boolean>(false);

	// run once
	// set pointer to be visible 
	// triggering a pointer to appear pointing towards the voting to encourage people to vote
	useEffect(() => {
		setShowPointer(true);	
		setTimeout(() => setShowPointer(false), 4000)
	},[]);

	
	const handleVote = (lang:string) => {
		setSelectedVote(lang);	
		mutate(selectedVote)
	}

	const handleOpenVote = () => {
		setIsVisible((prev:boolean) => !prev)
	}

	const languages = [
		{ name:"Typescript", icon:<TsLogo /> },
		{ name:"JavaScript ES6+", icon:<JsLogo />},
		{ name:"React", icon:<ReactLogo />},
		{ name:"NodeJS", icon:<NodeLogo />},
		{ name:"Fastify", icon:<FastifyLogo />},
		{ name:"PostgreSQL", icon:<PostgresLogo /> },
		{ name:"SQLite",  icon:<SqliteLogo />},
	];
	const voteLanguages = [
		{ name:"Rust", icon:<RustLogo /> },
		{ name:"Python", icon:<PythonLogo /> },
		{ name:"Go", icon:<GoLogo /> },
		{ name:"C++", icon:<CppLogo /> },
		{ name:"C", icon:<CLogo /> },
		{ name:"wasm", icon:<WasmLogo /> }
	]

	return(
		<div className="mainPage">
			{
				isVisible && (
					<div className="eventContainer">
						<EventDropDown
							vote={votes}
							handleVote={handleVote}
							success={updateSuccess}
							loading={updateLoading}
							isErr={updateIsErr}
							err={updateErr}
						/>
					</div>
				)
			}
			<header className="header">
				<NavBar
					toggleEvent={handleOpenVote}
				/>
			</header>
				{
					showPointer &&(
						<div className={`pointerContainer$`}>
							<div className="pointerContent">
								<div className="arrowContainer">
									<div className="arrowShaft">
										<div className="arrowHead"></div>
									</div>
								</div>
							</div>
							<div className="pointerTxtContainer">
								<p className="pointerTxT">Help me decide what language I should learn next :)</p>
							</div>
						</div>
					)
				}
			<div className="mainPageBody">	

				<div className="primaryGridContainer">
					<div className="avatar"></div>
					<div className="aboutMe">
						<h4>HEADER</h4>
						<p>PARA</p>	
					</div>
					<div className="primaryGridFooter">
					{languages.map((lang:{ name:string, icon:any }) => (
						<div className="iconContainer" key={lang.name}>
							<div className="icon">{lang.icon}</div>
							<span className="iconName">{lang.name}</span>
						</div>
					))}
					</div>
					<div className="voteButton">
						<h4 className="voteHeader">Vote</h4>
						<div className="marqueeContainer">
							<div className="marqueeGroup">
								{voteLanguages.map((lang:{ name:string, icon:any}) => (
									<div className="marqueeIcon" key={lang.name}>{lang.icon}</div>
								))}
								{voteLanguages.map((lang:{ name:string, icon:any}) => (
									<div className="marqueeIcon" key={lang.name} aria-hidden={true} >{lang.icon}</div>
								))}
							</div>
						</div>
					</div>
				 </div>

				<div className="mainPageSubTxt2">
					<Link to="/projects">View My Work</Link>
				</div>	
			</div>
		</div>
	)
}


