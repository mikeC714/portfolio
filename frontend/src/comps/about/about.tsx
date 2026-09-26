import type { ComponentType, Dispatch, SetStateAction } from "react";
import type { SECTION } from "../../types/about.d.ts";
import { X } from "lucide-react";



type PROPS = {
	display:SECTION;
	setDisplay:Dispatch<SetStateAction<SECTION>>;
	close:Dispatch<SetStateAction<boolean>>
	comps:Record<SECTION, ComponentType>;
}

function LearnMore({ display, setDisplay, close, comps }:PROPS){
	const Current = comps[display];
	return(
		<div className="learnMoreContainer">
			<header className="learnMoreHeader">
			<button className="learnMoreCloseBtn" onClick={() => close(false)}><X /></button>
				<div className="learnMoreHeaderContent">
					<div className="learnMoreNavigationContainer">
						<nav className="learnMoreNavigation">
							<ul className="learnMoreListContainer">
								{(Object.keys(comps) as Array<SECTION>).map((key) => {
									const isActive = display && display === key;
									return (
										<li key={key} className="learnMoreList">
											<button
												className="learnMoreNavBtn"
												onClick={() => setDisplay(key)}
												disabled={display === key}
												style={{ borderBottom: isActive ? "1px solid rgba(255,255,255,1)" : "none", paddingBottom: isActive ? "4px" : "0", color:"black"}}
											>
												{key}
											</button>
										</li>
									)}
								)}
							</ul>
						</nav>
					</div>
				</div>	
			</header>
			<div className="learnMoreContent">
				<Current />	
			</div>
		</div>
	)
}

type ABOUT_PROPS = {
	setHovered:Dispatch<SetStateAction<boolean>>;
	handleOpenLearnMore: () => void;
}

function About({ setHovered, handleOpenLearnMore }:ABOUT_PROPS){
	return (
		<div className="aboutMe">
			<header className="aboutMeHeader">
				<h2 className="aboutMeName">Michael Carter</h2>
				<span className="aboutMeLocation"
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<a href="https://en.wikipedia.org/wiki/Maryland" target="_blank" className="locationLink">Maryland, USA</a>
				</span>
			</header>
			<div className="aboutMeContent">
				<p className="aboutMePara">
					<span className="aboutMeStr"><strong>Self taught Software Engineer</strong></span> based in Maryland. 
					<span className="aboutMeStr"><strong> I build full-stack applications</strong></span> by day while deepening my knowledge of computer architecture and robotics at night.
				</p>	
				<button className="aboutMeLearnMore" id="aboutMe" onClick={handleOpenLearnMore}>Learn More</button>
			</div>
		</div>
	)
}


export { About, LearnMore };

