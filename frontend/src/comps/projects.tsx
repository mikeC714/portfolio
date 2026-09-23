import { RustLogo } from "../assets/rust.tsx";
import { PythonLogo } from "../assets/python.tsx"
import { GoLogo } from "../assets/golang.tsx"
import { WasmLogo } from "../assets/wasm.tsx"
import { CppLogo, CLogo } from "../assets/c.tsx";
import { JsLogo, TsLogo, FastifyLogo, ReactLogo, NodeLogo, BunLogo, ExLogo } from "../assets/js.tsx";
import { PostgresLogo, SqliteLogo } from "../assets/sql.tsx";

type PROPS = {
	img:any;
	bio:string;
	languages:string | Array<string>;
	title:string;
}

export function ProjectCard({img, bio, languages, title}:PROPS){

	const icons:Record<string, any> = {
		"Bun": <BunLogo h={20} w={20} />,
		"TypeScript": <TsLogo h={20} w={20} />,
		"Express": <ExLogo h={20} w={20} />,
		"Fastify": <FastifyLogo h={20} w={20} />,
		"SQLite": <SqliteLogo h={20} w={20} />,
		"PostgreSQL": <PostgresLogo h={20} w={20} />,
		"JavaScript": <JsLogo h={20} w={20} />,
		"React": <ReactLogo h={20} w={20} />
	};

	const colors:Record<string, string> = {
		"Bun":"rgba(251, 240, 223, 1)" ,
		"TypeScript":"rgba(49, 120, 198, 1)", 
		"Express":"rgba(255, 255, 255, 1)" ,
		"Fastify":"rgba(0, 0, 0, 1)" ,
		"SQLite": "rgba(125, 212, 245, 1)",
		"PostgreSQL":"rgba(51, 103, 145, 1)" ,
		"JavaScript":"rgba(247, 223, 30, 1)",
		"React":"rgba(97, 219, 251, 1)" 
	}

	return(
		<div className="projectCard">
			<div className="projectImgContainer">{img}HELLO WORLD!</div>
			<div className="projectInfoContainer">
				<h3 className="projectCardHeader">{title}</h3>
				<p className="projectCardBio">{bio}</p>
			</div>
			<footer className="projectCardFooter">
				{Array.isArray(languages) ? 
					languages.map((lang:string) => (
						<div key={lang} className="projectLangCell" style={{ "--lang-color": colors[lang] } as React.CSSProperties} >
							{lang}
							{icons[lang]}
						</div>
					))
					:
					<div className={`projectLangCell ${languages}`}>{languages}</div>
				}
			</footer>
		</div>
	)
}
