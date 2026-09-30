import { Machine2Pi, Tlog} from "../assets/projects.tsx";


export const projects = [
	{
		img:<Tlog h={264} w={440}/>,
		title:"TLog",
		repoName:"logger",
		languages:["TypeScript", "Bun", "NodeJs", "Fastify", "SQLite"], 
		bio:"Didn't really know what logger to use so I'm attempting to build my own. Gaining mass inspiration from the next best thing after Top Ramen NeoVim / Vim.",
		src:"Open",
		link:"https://github.com/mikeC714/logger"
	},
	{
		img:"",
		title:"Field-HQ",
		repoName:"field-hq",
		languages:["JavaScript", "NodeJs", "Express", "React", "PostgreSQL"],
		bio:`My very first Full-Stack project, using my experience in the Blue collar field as an electrician, I've come to notice the way that some of these businesses ecspecially smaller businesses aren't necessarily the most technically inclined, but often stuck to what was the easiest which just 
		happened to be pencil and paper which caused inconsistencies for pricing and inconsistent scheduling leading to them losing money.`,
		src:"Private",
		link:"https://field-hq.com"

	},
	{
		img:<Machine2Pi  h={264} w={440}/>,
		title:"Machine2Pi",
		repoName:"machine2pi",
		languages:["TypeScript", "Bun", "SQLite"],
		bio:"Currently I use a RaspberryPi as my Dev Host, and I am kind of tired of having to connect via SSH and juggle between terminals in order to just execute simple command such as starting the server. So I decided to build a way to communicate, and stream between my main machine and my raspberrypi.",
		src:"Open",
		link:"https://github.com/mikeC714/machine2pi"
	}
	
]
