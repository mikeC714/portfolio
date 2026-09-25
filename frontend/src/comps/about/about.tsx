import type { ComponentType, Dispatch, SetStateAction } from "react";


type Section = "Background" | "Hobbies" | "Philosophy";

type PROPS = {
	display:Section;
	setDisplay:Dispatch<SetStateAction<Section>>;
	comps:Record<Section, ComponentType>;
}

export function About({ display, setDisplay, comps }:PROPS){
	const Current = comps[display];

	return(
		<div className="learnMoreContainer">
			<header className="learnMoreHeader">
				<div className="learnMoreHeaderContent">

				</div>	
			</header>
			<div className="learnMoreNavigationContainer">
				<nav className="learnMoreNavigation">
					<ul className="learnMoreListContainer">
						{Object.entries(comps).map((key:any) => (
							<li key={key} className="learnMoreList">
								<button
									className="learnMoreNavBtn"
									onClick={() => setDisplay(key)}
									disabled={display === key}
								>
									{key}
								</button>
							</li>

						))}
					</ul>
				</nav>
			</div>

			<div className="learnMoreContent">
				<Current />	
			</div>
		</div>
	)
}
