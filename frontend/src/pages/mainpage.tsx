import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "../comps/navbar.tsx";
import { EventBar } from "../comps/event.tsx";
import { ProjectCard } from "../comps/projects.tsx";
import { About } from "../comps/about/about.tsx";
import { LearnMore } from "../comps/about/learnMore.tsx";
import { Background } from "../comps/about/comps/background.tsx";
import { Hobbies } from "../comps/about/comps/hobbies.tsx";
import { Philosophy } from "../comps/about/comps/philosophy.tsx";
import { Location } from "../comps/about/location.tsx";
import { useVotes } from "../hooks/vote.hooks.tsx";
import { projects } from "../utils/projects.tsx";
import { marylandImgs } from "../utils/maryland.tsx";
import { languages, voteLanguages } from "../utils/languages.tsx";
import { useUnmount } from "../hooks/unmount.tsx";
import { useLocalStorage } from "../hooks/uselocal.tsx"
import { useCommits } from "../hooks/commits.tsx";
import type { VOTE } from "../types/vote.d.ts";
import type { SECTION } from "../types/about.d.ts"; 


export function MainPage(){
	const [totalVotes, setTotalVotes] = useState<Array<VOTE>>([]);
	const [vote, setVote] = useLocalStorage("vote", { voted:false, language:"" })
	const [hovered, setHovered] = useState<boolean>(false);
	const [openVote, setOpenVote] = useState<boolean>(false);
	const [display, setDisplay] = useState<SECTION>("Background");
	const [learnMore, setLearnMore] = useState<boolean>(false);
	const [viewTools, setViewTools] = useState<{ view:boolean, lang:string }>({ view:false, lang:"" });
	const { get, update } = useVotes({ setTotalVotes, setVote });
	const { getLoading, getIsErr, getErr } = get();
	const { mutate, updateSuccess, updateLoading, updateIsErr, updateErr } = update();
	const commits = useCommits();



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
				<Location
					hovered={hovered}
					marylandImgs={marylandImgs}
				/>
			)}	
			{voteRender &&(
				<EventBar
					openVote={openVote}
					vote={vote}
					totalVotes={totalVotes}
					handleVote={handleVote}
					handleClose={handleOpenVote}
					updateSuccess={updateSuccess}
					updateLoading={updateLoading}
					updateIsErr={updateIsErr}
					updateErr={updateErr}
					getLoading={getLoading}
					getIsErr={getIsErr}
					getErr={getErr}
				/>
			)}
			<header className="header">
				<NavBar 
					handleOpenVote={handleOpenVote} 
					handleOpenLearnMore={handleOpenLearnMore}
				/>
			</header>
			<div className="mainPageBody">	
				{learnRender && (
					<LearnMore 
						openLearnMore={learnMore}
						display={display}
						setDisplay={setDisplay}
						close={setLearnMore}
						comps={{ Background, Hobbies, Philosophy }}
					/>
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
											  status={p.status}
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


