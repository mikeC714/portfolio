import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin, faDiscord } from "@fortawesome/free-brands-svg-icons";

interface Props{
	highlight: boolean
}
export function ContactBar({ highlight }: Props){
	return(
		<div className="contactBar">	
			{ highlight === true ? (
			<ul className="contactList">
				<a href="" className="contactContainer">
					<li className="githubIcon active"><FontAwesomeIcon icon={faGithub}/></li>
				</a>
				<a href="" className="contactContainer active">
					<li className="linkedinIcon active"><FontAwesomeIcon icon={faLinkedin}/></li>
				</a>
				<a href="" className="contactContainer active">
					<li className="discordIcon active"><FontAwesomeIcon icon={faDiscord}/></li>
				</a>
			</ul>
			) : 
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
			}
		</div>
	)
}
