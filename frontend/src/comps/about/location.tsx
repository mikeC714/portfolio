import type { ReactElement } from "react";

type PROPS = {
	hovered:boolean;
	marylandImgs:Array<{ name:string, img:ReactElement}>
};

export function Location({ hovered, marylandImgs }:PROPS){
	return(
		<div className={`locationHoverContainer ${hovered ? "" : "fade"} `}>
			<div className="locationHoverImgFrame">
				<div className="locationHoverImgs">
					{marylandImgs.map((img:any) => (
						<div className="locationImg" key={img.name}>
							{img.img}
						</div>
					)) }
				</div>		
			</div>
			<div className="locationHoverLine"></div>
			<div className="locationHoverInfoContainer">
				<p className="locationInfo"> 
					Maryland is a small Mid-Atlantic state famous for the Chesapeake Bay, blue crabs and Old Bay seasoning tying to its long maritime history.
					It was one of the original thirteen colonies, 
					founded in 1634 as a haven for English Catholics, 
					and it's where Francis Scott Key wrote "The Star-Spangled Banner" after watching the defense of Fort McHenry in Baltimore during the War of 1812.
				</p>
			</div>
		</div>
	)
}
