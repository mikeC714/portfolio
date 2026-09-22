import { useState, useEffect } from "react";
import { NavBar } from "../comps/navbar.tsx";
import { EventBar } from "../comps/event.tsx";
import { Link } from "react-router-dom";
import { useVotes } from "../vote.hooks.tsx";
import { socket } from "../config.tsx";
import { RepoFish, Crab } from "../comps/repo.tsx";
import { ProjectCard } from "../comps/projects.tsx";
import { projects } from "../utils/projects.tsx";
import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { JsLogo, TsLogo, FastifyLogo, ReactLogo, NodeLogo } from "../assets/js.tsx";
import { PostgresLogo, SqliteLogo } from "../assets/sql.tsx";
import type { VOTE } from "../types/vote.d.ts";


type JSON<T> = string & { readonly __brand: T };
type REPO = {
	repoName:string;
	repoUrl:string;
	langs:string | Array<string>;
	bio:string;  
}
type SOCKET_DATA = JSON<REPO>;


export function MainPage(){
	const { get, update } = useVotes();
	const [votes, setVotes] = useState<VOTE[]>([]);
	const [repos, setRepos] = useState<REPO[]>([]);
	const { getLoading, getIsErr, getErr } = get({ setVotes });
	const { mutate, updateSuccess, updateLoading, updateIsErr, updateErr } = update();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [selectedVote, setSelectedVote] = useState<null | string>(null);
	const [hooked, setHooked] = useState<string | null>(null);

	useEffect(() => {
		socket.on("repo", (data:SOCKET_DATA) => {
			try{
				let parsed = JSON.parse(data);
				setRepos([...repos, parsed]);
			}catch(e){
				throw e;
			}	
		})
		return () => {
			socket.off("repo");
		};
	},[]);
	
	const handleVote = (lang:string) => {
		setSelectedVote(lang);	
		mutate(selectedVote)
	}

	const handleOpenVote = () => {
		setIsVisible((prev:boolean) => !prev)
	}

	const hook = (repoName:string) => {
		setHooked(repoName);
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
			<div className="eventContainer">
				<EventBar
					vote={votes}
					handleVote={handleVote}
					success={updateSuccess}
					loading={updateLoading}
					isErr={updateIsErr}
					err={updateErr}
				/>
			</div>
			<header className="header">
				<NavBar
					toggleEvent={handleOpenVote}
				/>
			</header>
			<div className="mainPageBody">	

				<div className="primaryGridContainer">
					<div className="fishTank">
						<div className="waves">
							<div className="waves1"></div>
							<div className="waves2"></div>
							<div className="waves3"></div>
						</div>
						<div className="water"></div>
						{repos.length > 0 ? (
							<div className="repoFishContainer">
								{repos.map((repo:REPO) => (
									<RepoFish
										repoName={repo.repoName}
										bio={repo.bio}
										langs={repo.langs}
										hook={hook}
									/>
								))};
							</div>
						):
						<div className="crabContainer">
							<Crab />	
						</div>
						}
					</div>
					<div className="aboutMe">
						<header className="aboutMeHeader">
							<h2 className="aboutMeName">Michael Carter</h2>
							<span className="aboutMeLocation"><a href="">Maryland, USA</a></span>
						</header>
						<div className="aboutMeContent">
							<p className="aboutMePara">Self taught Software Engineer based in Maryland.
								I build full stack applications by day while deepening my knowledge of computer architecture and robotics at night.
							</p>	
							<button className="aboutMeLearnMore">Learn More</button>
						</div>
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

				<section className="projectsSection">
					<h2 className="projectsHeader">projects</h2>		
					<div className="projectGrid">
						{projects.map((p:any) => (
							<ProjectCard 
								img={p.img}
								title={p.title}
								bio={p.bio}
								languages={p.languages}
							/>		

						))}
					</div>
				</section>	
			</div>
		</div>
	)
}


