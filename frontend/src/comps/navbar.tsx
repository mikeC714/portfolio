import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faDiscord,  } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
type PROPS = {
	handleOpenVote:() => void;
};

export function NavBar({ handleOpenVote }:PROPS){
	return(
		<div className="mainNav">
			<nav className="mainNavListContainer">
					<ul className="mainNavList">
						<a href="#mainPage" className="navLink"><li className="navList">Home</li></a>
						<a href="#about" className="navLink"><li className="navList">About</li></a>
						<a href="#projects" className="navLink"><li className="navList">View Projects</li></a>
						<li className="navList" onClick={handleOpenVote}>Vote</li>
					</ul>
			</nav>
			<div className="contactBar">	
				<ul className="contactBarList">
					<li className="contactContainer" >
						<a target="__blank" className="emailIcon contactIcon"> <FontAwesomeIcon icon={faEnvelope as IconProp} /></a>
					</li>
					<li className="contactContainer" >
						<a href={`${import.meta.env.VITE_GITHUB}`} target="__blank" className="githubIcon contactIcon"><FontAwesomeIcon icon={faGithub}/> </a>
					</li>
					<li className="contactContainer" >
						<a href="" className="linkedinIcon conatactIcon"><FontAwesomeIcon icon={faLinkedin}/></a>
					</li>
					<li className="contactContainer" >
						<a href={`${import.meta.env.VITE_DISCORD}`} className="discordIcon contactIcon"><FontAwesomeIcon icon={faDiscord}/></a>
					</li> 

				</ul>
			</div>
		</div>	
	)
}
