import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";

export function ContactBar(){
	return(
		<div className="contactBar">	
			<ul>
				<a href=""className="contactContainer" >
					<li className="githubIcon"><FontAwesomeIcon icon={faGithub}/></li>
				</a>
				<a href="" className="contactContainer">
					<li className="linkedinIcon"><FontAwesomeIcon icon={faLinkedin}/></li>
				</a>
				<a href="" className="contactContainer">
					<li className="discordIcon"><FontAwesomeIcon icon={faDiscord}/></li>
				</a>
			</ul>
		</div>
	)
}
