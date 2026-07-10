import { Link } from "react-router-dom";

interface Props{
	contactHighlight:() => void
}

export function NavBar({ contactHighlight }: Props){
	return(
		<nav>
			<ul>
				<div className="mainNavContainer">
					<Link to="/"><li>Home</li></Link>
					<Link to="/about"><li>About</li></Link>
					<li onClick={contactHighlight}>Contact</li>
				</div>
				<div className="projectsNav"><Link to="/projects">View Projects</Link></div>
			</ul>
		</nav>	
	)
}
