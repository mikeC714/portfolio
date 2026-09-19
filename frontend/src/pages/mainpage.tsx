import { useState } from "react";
import { NavBar } from "../comps/navbar.tsx";
import { ContactBar } from "../comps/contactbar.tsx";
import { EventDropDown } from "../comps/event.tsx";
import { Link } from "react-router-dom";
import { useVotes } from "../vote.hooks.tsx";
import type { VOTE } from "../types/vote.d.ts";

export function MainPage(){
	const { get, update } = useVotes();
	const [votes, setVotes] = useState<VOTE[]>([]);
	const { getLoading, getIsErr, getErr } = get({ setVotes });
	const { mutate, updateSuccess, updateLoading, updateIsErr, updateErr } = update();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [selectedVote, setSelectedVote] = useState<null | string>(null);
	
	const handleVote = (lang:string) => {
		setSelectedVote(lang);	
		mutate(selectedVote)
	}

	const handleOpenVote = () => {
		setIsVisible((prev:boolean) => !prev)
	}

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
			<header>
				<NavBar
					toggleEvent={handleOpenVote}
				/>
			</header>
			<div className="contactBarContainer">
				<ContactBar /> 
			</div>
			<div className="mainPageBody">	
				<div className="mainPageSubTxt1">
					<header className="mainSubTxtHeader">
						<h3>CORE STACK</h3>
					</header>
					<ul>
						<li><div></div>PostgreSQL</li>
						<li><div></div>TypeScript</li>
						<li><div></div>Node.JS</li>
						<li><div></div>React</li>
					</ul>
				</div>	
				<div></div> 
				<div className="mainPageSubTxt2">
					<header className="mainSubtTxtHeader">
						<div></div>
						<p>JUST USE POSTGRES</p>
					</header>
					<h2></h2>	
					<p></p>
					<Link to="/projects">View My Work</Link>
				</div>	
			</div>
		</div>
	)
}
