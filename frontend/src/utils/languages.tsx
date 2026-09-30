import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { JsLogo, TsLogo, FastifyLogo, ReactLogo, NodeLogo, ExLogo, BunLogo, ReactRouterLogo, TanStackLogo} from "../assets/js.tsx";
import { PostgresLogo, SqliteLogo } from "../assets/sql.tsx";


const languages = [
	{ 
		name:"Typescript", 
		icon:<TsLogo />,
		tools:[
			{ name:"Bun", icon:<BunLogo h={30} w={30} />},
		]		
	},
	{ name:"JavaScript", icon:<JsLogo />},
	{
		name:"React", 
		icon:<ReactLogo />,
		tools:[
			{ name:"React Router", icon:<ReactRouterLogo  h={30} w={30}/> },
			{ name:"TanStack Query", icon:<TanStackLogo  h={30} w={30}/>}	
		]
	},
	{
		name:"NodeJS",
		icon:<NodeLogo />,
		tools:[
			{ name:"Fastify", icon:<FastifyLogo  h={30} w={30}/>},
			{ name:"Express", icon:<ExLogo  h={30} w={30}/> },
		]
	},
	{ name:"PostgreSQL", icon:<PostgresLogo /> },
	{ name:"SQLite",  icon:<SqliteLogo />},
];
const voteLanguages = [
	{ lang:"rust", icon:<RustLogo /> },
	{ lang:"python", icon:<PythonLogo /> },
	{ lang:"go", icon:<GoLogo /> },
	{ lang:"cpp", icon:<CppLogo /> },
	{ lang:"c", icon:<CLogo /> },
	{ lang:"assembly", icon:<WasmLogo /> }
]

export { voteLanguages, languages };
