import type { Dispatch, ComponentType, SetStateAction } from "react";
import type { SECTION } from "../../types/about.d.ts";
import { X } from "lucide-react";

type PROPS = {
	openLearnMore:boolean;
	display:SECTION;
	setDisplay:Dispatch<SetStateAction<SECTION>>;
	close:Dispatch<SetStateAction<boolean>>
	comps:Record<SECTION, ComponentType>;
}

export function LearnMore({ openLearnMore, display, setDisplay, close, comps }:PROPS){
	const Current = comps[display];
	return(
		<div className={`learnMoreAboutContainer ${openLearnMore ? "" : "close"}`}>
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
		</div>
	)
}

