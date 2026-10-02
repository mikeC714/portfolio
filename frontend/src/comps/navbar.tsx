import { Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";

type PROPS = {
	handleOpenVote:() => void;
	handleOpenLearnMore:() => void;
};

export function NavBar({ handleOpenVote, handleOpenLearnMore }:PROPS){
	return(
		<div className="mainNav">
			<nav className="mainNavListContainer">
					<ul className="mainNavList">
						<a href="/" className="navLink"><li className="navList">Home</li></a>
						<li className="navList" onClick={handleOpenLearnMore}>About</li>
						<a href="#projects" className="navLink"><li className="navList">View Projects</li></a>
						<li className="navList" onClick={handleOpenVote}>Vote</li>
					</ul>
			</nav>
			<div className="contactBar">	
				<ul className="contactBarList">
					<li className="contactContainer" >
						<a href={`mailto:${import.meta.env.VITE_EMAIL}`} className="emailIcon contactIcon"><Mail /></a>
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
