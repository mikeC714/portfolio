import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";
type PROPS = {
	toggleEvent:() => void;
};

export function NavBar({ toggleEvent }:PROPS){
	return(
		<nav className="mainNav">
		<div className="mainNavListContainer">
				<ul className="mainNavList">
					<Link to="/"><li>Home</li></Link>
					<Link to="/about"><li>About</li></Link>
					<Link to="/projects"><li>View Projects</li></Link>
					<li>
					<button 
						className="toggleVoteBtn"
						onClick={() => toggleEvent }
					>
						Vote 	
					</button>
					</li>
				</ul>
			</div>
		</nav>	
	)
}

				// <div className="contactBar">	
				// 	<ul>
				// 		<a href=""className="contactContainer" >
				// 			<li className="githubIcon"><FontAwesomeIcon icon={faGithub}/></li>
				// 		</a>
				// 		<a href="" className="contactContainer">
				// 			<li className="linkedinIcon"><FontAwesomeIcon icon={faLinkedin}/></li>
				// 		</a>
				// 		<a href="" className="contactContainer">
				// 			<li className="discordIcon"><FontAwesomeIcon icon={faDiscord}/></li>
				// 		</a>
				// 	</ul>
				// </div>
