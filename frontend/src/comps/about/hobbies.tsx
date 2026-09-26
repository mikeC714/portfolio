import { hobbies } from "../../utils/hobbies.tsx";


export function Hobbies(){
	return(
		<div className="hobbyContainer">
			<ul>
				<li>Reading</li>
				<li>Weight Lifting</li>
				<li>TV</li>
			</ul>

			<div className="hobbyWorkingContainer">
				{hobbies.map((item:{ name:string, progression:number }) => {
					return(
						<div className="hobbyItem">
							<span className="hobbyName">{item.name}</span>
							<div className="hobbyProgressBar">
								<div className={`hobbyProgress ${item.name}`} style={{ width:item.progression }}></div>
							</div>
						</div>
					)
				})}		
			</div>
		</div>
	)
}
