import type { Dispatch, SetStateAction } from "react";

type ABOUT_PROPS = {
	setHovered:Dispatch<SetStateAction<boolean>>;
	handleOpenLearnMore: () => void;
}

export function About({ setHovered, handleOpenLearnMore }:ABOUT_PROPS){
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



