import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";
type PROPS = {
	toggleEvent:() => void;
};

export function NavBar({ toggleEvent }:PROPS){
	return(
		<div className="mainNav">
			<nav className="mainNavListContainer">
					<ul className="mainNavList">
						<Link to="/" className="navLink"><li className="navList">Home</li></Link>
						<Link to="#about" className="navLink"><li className="navList">About</li></Link>
						<Link to="#projects" className="navLink"><li className="navList">View Projects</li></Link>
						<li className="navList" onClick={() => toggleEvent }>Vote</li>
					</ul>
			</nav>
			<div className="contactBar">	
				<ul className="contactBarList">
					<li className="contactContainer" >
						<a href=""className="githubIcon contactIcon"><FontAwesomeIcon icon={faGithub}/> </a>
					</li>
					<li className="contactContainer" >
						<a href="" className="linkedinIcon conatactIcon"><FontAwesomeIcon icon={faLinkedin}/></a>
					</li>
					<li className="contactContainer" >
						<a href="" className="discordIcon contactIcon"><FontAwesomeIcon icon={faDiscord}/></a>
					</li> 
				</ul>
			</div>
		</div>	
	)
}
