import { useState, useEffect } from "react";
import { socket } from "../config.tsx";
import { NavBar } from "../comps/navbar.tsx";
import { EventBar } from "../comps/event.tsx";
import { ProjectCard } from "../comps/projects.tsx";
import { Hobbies } from "../comps/about/hobbies.tsx";
import { Philosophy } from "../comps/about/philosophy.tsx";
import { About, LearnMore } from "../comps/about/about.tsx";
import { Background } from "../comps/about/background.tsx";
import { useVotes } from "../hooks/vote.hooks.tsx";
import { projects } from "../utils/projects.tsx";
import { marylandImgs } from "../utils/maryland.tsx";
import { languages, voteLanguages } from "../utils/languages.tsx";
import { useUnmount } from "../hooks/unmount.tsx";
import { useLocalStorage } from "../hooks/uselocal.tsx"
import { useCommits } from "../hooks/commits.tsx";
import type { VOTE } from "../types/vote.d.ts";
import type { SECTION } from "../types/about.d.ts"; 
import type { REPO } from "../types/repo.d.ts"; 
import type { SOCKET_DATA } from "../types/socket.d.ts"; 




export function MainPage(){
	const [totalVotes, setTotalVotes] = useState<VOTE[]>([]);
	const [repos, setRepos] = useState<REPO[]>([]);
	const [vote, setVote] = useLocalStorage("vote", { voted:false, language:"" })
	const [hovered, setHovered] = useState<boolean>(false);
	const [openVote, setOpenVote] = useState<boolean>(false);
	const [hooked, setHooked] = useState<string | null>(null);
	const [display, setDisplay] = useState<SECTION>("Background");
	const [learnMore, setLearnMore] = useState<boolean>(false);
	const [viewTools, setViewTools] = useState<{ view:boolean, lang:string }>({ view:false, lang:"" });
	const { get, update } = useVotes({ setTotalVotes, setVote });
	const { getLoading, getIsErr, getErr } = get();
	const { mutate, updateSuccess, updateLoading, updateIsErr, updateErr } = update();
	const commits = useCommits();


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
	const toolsRender = useUnmount(viewTools.view, 300);
	const learnRender = useUnmount(learnMore, 300);
	const handleVote = (lang:string) => mutate(lang); 
	const handleOpenVote = () => setOpenVote((prev:boolean) => !prev);
	const handleOpenLearnMore = () => setLearnMore((prev:boolean) => !prev); 
	const handleOpenProject = (title:string) => { 
		const target = projects.find((p:any) => p.repoName === title);
		window.open(target?.link, "__blank", "noopener, noreferrer")
	};

	

	return(
		<div className="mainPage">
			{locationRender && (
				<div className={`locationHoverContainer ${hovered ? "" : "fade"} `}>
					<div className="locationHoverImgFrame">
						<div className="locationHoverImgs">
							{marylandImgs.map((img:any) => (
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
						totalVotes={totalVotes}
						handleVote={handleVote}
						handleClose={handleOpenVote}
						updateLoading={updateLoading}
						updateIsErr={updateIsErr}
						updateErr={updateErr}
						getLoading={getLoading}
						getIsErr={getIsErr}
						getErr={getErr}
					/>
				</div> 
			)}
			<header className="header">
				<NavBar 
					handleOpenVote={handleOpenVote} 
					handleOpenLearnMore={handleOpenLearnMore}
				/>
			</header>
			<div className="mainPageBody">	
				{learnRender && (
						<div className={`learnMoreAboutContainer ${learnMore ? "" : "close"}`}>
						<LearnMore 
							display={display}
							setDisplay={setDisplay}
							close={setLearnMore}
							comps={{ Background, Hobbies, Philosophy }}
						/>
					</div>	
				)}
				<div className="primaryGridContainer">
					<About 
						handleOpenLearnMore={handleOpenLearnMore}
						setHovered={setHovered}
					/>
					<div className="primaryGridFooter">
						{languages.map((lang:{ name:string, icon:any, tools?:Array<{ name:string, icon:any }>}) => { 
							const isOpen = viewTools.view && viewTools.lang === lang.name;
							const hasTools = toolsRender && viewTools.lang === lang.name; 
							return(
								<div 
									key={lang.name} className="iconContainer"
									onMouseEnter={lang?.tools !== undefined && lang?.tools.length > 0 ? () => setViewTools({ view:true, lang: lang.name }) : undefined}
									onMouseLeave={lang?.tools !== undefined && lang?.tools.length > 0 ? () => setViewTools({ view:false, lang:lang.name }) : undefined}
									style={{ cursor: lang.tools !== undefined && lang.tools?.length > 0 ? "pointer" : "auto" }}
								>
									{hasTools && (
										<div className={`displayToolsContainer ${isOpen ? "" : "close"}`}>
											<div key={lang.name} className="toolContainer">
												{lang.tools?.map((tool: any) => (
													<div key={tool.name} className="langTool">
														{tool.icon}
														<span className="langToolName">{tool.name}</span>
													</div>
												))}
											</div>
										</div>
									)}
									<div className="icon">{lang.icon}</div>
									<span className="iconName">{lang.name}</span>
								</div>
							)}
						)}
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
				<header className="projectsHeader">
					<h2 className="projectsHeaderTitle">projects </h2>		
					<span className="projectsHeaderSpan">:=</span>
				</header>
					<div className="projectsContainer">
						  {
							projects.map((p:any) => {
								    const c = commits.find((c:any) => c.project === p.repoName);
								    const lastCommit = c?.commitData?.data[0];
									 return (
										<ProjectCard
											  key={p.title}
											  img={p.img}
											  title={p.title}
											  repoName={p?.repoName}
											  bio={p.bio}
											  languages={p.languages}
											  link={p.link}
											  src={p.src}
											  commit={lastCommit}
											  commitLoading={c?.commitLoading as boolean}
											  commitErr={c?.commitErr as Error | null}
											  openProject={handleOpenProject}
										/>
								    );
							 })
						  }
					</div>
				</section>	
			</div>
		</div>
	)
}


