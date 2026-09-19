import { Link } from "react-router-dom";

type PROPS = {
	toggleEvent:() => void
};

export function NavBar({ toggleEvent }:PROPS){
	return(
		<nav>
			<ul>
				<div className="mainNavContainer">
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
				</div>
			</ul>
		</nav>	
	)
}
