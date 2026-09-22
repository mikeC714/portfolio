type PROPS = {
	repoName:string;
	repoUrl?:string;
	langs:string | Array<string>;
	bio:string;  
	hook:(repoName:string) => void;
}

function RepoFish({ repoName, bio, langs, hook }:PROPS){
	return(
		<div className="fishConatiner">
			<div className="fishBody" onClick={() => hook(repoName)}>
				<h2 className="repoName">{repoName}</h2>
				<div className="repoLine"></div>
				<p className="repoPara">{bio}</p>
				{Array.isArray(langs) ? langs.map(lang => (
					<div className={`repoLang`}>{lang}</div>
				)): 
					<div className={`repoLang`}>{langs}</div>
				}
			</div>
			<div className="fishTail"> </div>
		</div>
	)
}

function Crab(){
	return(
		<div className="crab">
			<div className="crabContent">
				<div className="crabBodyContainer">
					<div className="crabHat">
						<div className="crabHatDesign">
							
						</div>
					</div>
					<div className="crabEyes">
						<div className="crabEye">
							<div className="crabEyeHighlight"></div>
						</div>
						<div className="crabEye">
							<div className="crabEyeHighlight"></div>
						</div>
					</div>
				</div>
				<div className="crabSmile">
					<div className="crabDimple left"></div>
					<div className="crabCurve"></div>
					<div className="crabDimple right"></div>
				</div>
						
				<div className="crabArmL">
					<div className="crabPincer">
						<div className="crabClawL left"></div>
						<div className="crabClawR left"></div>
					</div>
				</div>
				<div className="crabArmR">
					<div className="crabPincer">
						<div className="crabClawL right"></div>
						<div className="crabClawR right"></div>
					</div>
				</div>
				<div className="crabLeg1"></div>
				<div className="crabLeg2"></div>
				<div className="crabLeg3"></div>
				<div className="crabLeg4"></div>
			</div>
		</div>
	)	
};


export { RepoFish, Crab }
