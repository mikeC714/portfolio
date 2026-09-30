import { JsLogo, TsLogo, FastifyLogo, ReactLogo, NodeLogo, BunLogo, ExLogo } from "../assets/js.tsx";
import { PostgresLogo, SqliteLogo } from "../assets/sql.tsx";
import { timeAgo } from "../utils/time.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { GitCommitVertical, Dot } from "lucide-react";
import type { PROJECT } from "../types/projects.d.ts";



export function ProjectCard({img, bio, languages, title, repoName, src, link, commit, commitLoading, commitErr, openProject}:PROJECT){

	const icons:Record<string, any> = {
		"Bun": <BunLogo h={20} w={20} />,
		"TypeScript": <TsLogo h={20} w={20} />,
		"Express": <ExLogo h={20} w={20} />,
		"NodeJs":<NodeLogo h={20}  w={20} />,
		"Fastify": <FastifyLogo h={20} w={20} />,
		"SQLite": <SqliteLogo h={20} w={20} />,
		"PostgreSQL": <PostgresLogo h={20} w={20} />,
		"JavaScript": <JsLogo h={20} w={20} />,
		"React": <ReactLogo h={20} w={20} />
	};

	const colors:Record<string, string> = {
		"Bun":"rgba(251, 240, 223, 1)" ,
		"TypeScript":"rgba(49, 120, 198, 1)", 
		"NodeJs":"rgba(60, 135, 58, 1)", 
		"Express":"rgba(255, 255, 255, 1)" ,
		"Fastify":"rgba(0, 0, 0, 1)" ,
		"SQLite": "rgba(125, 212, 245, 1)",
		"PostgreSQL":"rgba(51, 103, 145, 1)" ,
		"JavaScript":"rgba(247, 223, 30, 1)",
		"React":"rgba(97, 219, 251, 1)" 
	}


	return(
		<div className="projectCard">
			<div className="projectCardHeader"  onClick={() => openProject(repoName)}>
				<div className="projectCardImg">{img}</div>
				<div className="projectCardSrc">{src}</div>
			</div>
			<div className="projectInfoContainer">
				<div className="projectInfoHeader">
					<h3 className="projectCardTitle">{title}</h3>
				</div>
				<div className="projectCardBio">{bio}</div>
				<div className="projectCardLangs">
					{Array.isArray(languages) ? 
						languages.map((lang:string) => (
							<div key={lang} className="projectLangCell" style={{ "--lang-color": colors[lang] } as React.CSSProperties} >
								{lang}
								{icons[lang]}
							</div>
						))
						:
						<div className={`projectLangCell ${languages}`}>{languages}</div>
					}
				</div>
			</div>
			<div className="projectCardCommit">
				<span className="projectCardCommitTxt projectCardCommitIcon"><GitCommitVertical size={28} /></span>
				<div className="projectCardAuthorNDate">
					<p className="projectCardCommitTxt projectCardCommitMsg">{commit?.commit?.message}</p>
					<div className="projectCardCommitMeta">
						<p className="projectCardCommitTxt projectCardCommitId">#{commit?.sha.slice(0,7)}</p>
						<span className="projectCardCommitDot"><Dot size={20} /></span>
						<p className="projectCardCommitTxt projectCardCommitTime">{timeAgo(commit?.commit?.committer?.date)}</p>
					</div>
				</div>
			</div>
			<footer className="projectCardFooter">
				<button className="projectCardLinkBtn">
					{ src === "Open" ? 
						<a href={link}><FontAwesomeIcon icon={faGithub} /> View Code</a> :
						<a href={link}>View Site</a> 
					}
				</button>
			</footer>
		</div>
	)
}
