import { useState } from "react";
import { NavBar } from "../comps/navbar.tsx";
import { ContactBar } from "../comps/contactbar.tsx";
import { EventBar } from "../comps/eventbar.tsx";
import { Link } from "react-router-dom";

export type VoteBody = {
	id:number,
	lang:string,
	counter:number
}


export function MainPage(){
	const [highlight, setHighlight] = useState(false);
	const [vote, setVote] = useState<VoteBody[]>([
		{id:1, lang:"Rust", counter:0},
		{id:2, lang:"GO", counter:0},
		{id:3, lang:"Python", counter:0},
		{id:4, lang:"Cpp", counter:0},
		{id:5, lang:"Assembly", counter:0}
	])
		
	const handleVote = (id:number): void => {
		setVote(prev => 
			prev.map(v =>
				v.id === id ? {...v, counter: v.counter + 1} : v
			)	
		);	
	};

	const handleHighlight = () => {
		setHighlight((prev:boolean) => !prev);
	}

	return(
		<div className="mainPage">
			<header>
				<NavBar 
					contactHighlight={handleHighlight}	
				/>
			</header>
			<div className="contactBarContainer">
				<ContactBar 
					highlight={highlight}
				/> 
			</div>
			<div className="mainPageBody">	
				<div className="mainPageSubTxt1">
					<header className="mainSubTxtHeader">
						<h3>CORE STACK</h3>
					</header>
					<ul>
						<li><div></div>PostgreSQL</li>
						<li><div></div>JavaScript</li>
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
			<footer>
				<EventBar 
					vote={vote}
					handleVote={handleVote}
				/>
			</footer>
		</div>
	)
}
