type PROPS = {
	img:any;
	bio:string;
	languages:string | Array<string>;
	title:string;
}

export function ProjectCard({img, bio, languages, title}:PROPS){
	return(
		<div className="projectCard">
			<div className="imgContainer">{img}</div>
			<div className="infoContainer">
				<h3 className="projectCardHeader">{title}</h3>
				<p className="projectCardBio">{bio}</p>
			</div>
			<footer className="projectCardFooter">
				{Array.isArray(languages) ? 
					languages.map((lang:string) => (
						<div key={lang} className={`projectLangCell ${lang}`}>{lang}</div>
					))
					:
					<div className={`projectLangCell ${languages}`}>{languages}</div>
				}
			</footer>
		</div>
	)
}
