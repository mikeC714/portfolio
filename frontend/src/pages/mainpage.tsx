import { useState, useEffect } from "react";
import { socket } from "../config.tsx";
import { NavBar } from "../comps/navbar.tsx";
import { EventBar } from "../comps/event.tsx";
import { ProjectCard } from "../comps/projects.tsx";
import { useVotes } from "../hooks/vote.hooks.tsx";
import { projects } from "../utils/projects.tsx";
import { useUnmount } from "../hooks/unmount.tsx";
import { useLocalStorage } from "../hooks/uselocal.tsx"
import { Fort, Bmore, Crab, Bay } from "../assets/maryland.tsx";
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
	const [votes, setVotes] = useState<VOTE[]>([]);
	const [repos, setRepos] = useState<REPO[]>([]);
	const [vote, setVote] = useLocalStorage("vote", { voted:false, language:"" })
	const { get, update } = useVotes({ setVotes, setVote });
	const [hovered, setHovered] = useState<boolean>(false);
	const [openVote, setOpenVote] = useState<boolean>(false);
	const [hooked, setHooked] = useState<string | null>(null);
	const { getLoading, getIsErr, getErr } = get();
	const { mutate, updateSuccess, updateLoading, updateIsErr, updateErr } = update();

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

	const locationRender = useUnmount(hovered, 3000);
	const voteRender = useUnmount(openVote, 500);
	
	const handleVote = (lang:string) => {
		mutate(lang)
	}

	const handleOpenVote = () => {
		setOpenVote((prev:boolean) => !prev)
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
	const marylandImgs = [
		{name:"bay", img:<Bay />}, 
		{name:"bmore", img:<Bmore />}, 
		{name:"crab", img:<Crab />}, 
		{name:"fort", img:<Fort />}, 
	];

	return(
		<div className="mainPage">
			{locationRender && (
				<div className={`locationHoverContainer ${hovered ? "" : "fade"} `}>
					<div className="locationHoverImgFrame">
						<div className="locationHoverImgs">
							{ marylandImgs.map((img:any) => (
								<div className="locationImg" key={img.name}>
									{img.img}
								</div>
							)) }
						</div>		
					</div>
					<div className="locationHoverLine"></div>
					<div className="locationHoverInfoContainer">
						<p className="locationInfo"> 
							Maryland is a small Mid-Atlantic state famous for the Chesapeake Bay, blue crabs and Old Bay seasoning tying to its long maritime history.
							It was one of the original thirteen colonies, 
							founded in 1634 as a haven for English Catholics, 
							and it's where Francis Scott Key wrote "The Star-Spangled Banner" after watching the defense of Fort McHenry in Baltimore during the War of 1812.
						</p>
					</div>
				</div>
			)}	
			{voteRender &&(
				<div className={`eventContainer ${openVote ? "" : "close"}`}>
					<EventBar
						vote={vote}
						voteCount={votes}
						handleVote={handleVote}
						handleClose={handleOpenVote}
						success={updateSuccess}
						loading={updateLoading}
						isErr={updateIsErr}
						err={updateErr}
					/>
				</div>
			)}
			<header className="header">
				<NavBar handleOpenVote={handleOpenVote} />
			</header>
			<div className="mainPageBody">	
				<div className="primaryGridContainer">
				{
					// <div className="fishTank">
					// 	<div className="waves">
					// 		<div className="waves1"></div>
					// 		<div className="waves2"></div>
					// 		<div className="waves3"></div>
					// 	</div>
					// 	<div className="water"></div>
					// 	{projects.length > 0 ? (
					// 		<>
					// 			{projects.map((repo:any) => (
					// 				<RepoFish
					// 					repoName={repo.repoName}
					// 					bio={repo.bio}
					// 					langs={repo.langs}
					// 					hook={hook}
					// 				/>
					// 			))};
					// 		</>
					// 	):
					// 	<div className="crabContainer">
					// 		<Crab />	
					// 	</div>
					// 	}
					// 	</div>
					}

					<div className="aboutMe">
						<header className="aboutMeHeader">
							<h2 className="aboutMeName">Michael Carter</h2>
							<span className="aboutMeLocation"
								onMouseEnter={() => setHovered(true)}
								onMouseLeave={() => setHovered(false)}
							>
								<a href="https://en.wikipedia.org/wiki/Maryland" target="_blank" className="locationLink">Maryland, USA</a>
							</span>
						</header>
						<div className="aboutMeContent">
							<p className="aboutMePara">
								<span className="aboutMeStr"><strong>Self taught Software Engineer</strong></span> based in Maryland. 
								<span className="aboutMeStr"><strong> I build full-stack applications</strong></span> by day while deepening my knowledge of computer architecture and robotics at night.
							</p>	
							<button className="aboutMeLearnMore" id="aboutMe">Learn More</button>
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
					<div className="voteButton" onClick={handleOpenVote}>
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

				<section className="projects" id="projects">
				<h2 className="projectsHeader">projects   := </h2>		
					<div className="projectsContainer">
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


