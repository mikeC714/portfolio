import fs from "node:fs/promises";
import path from "path";

export class Logger{
	#logPath
	constructor(dirPath){
		this.init(dirPath)
	}	
	init = async(dirPath) => {
		if(!dirPath) {
			await fs.mkdir(path.join(__dirname, 'logs'), { recursive: true });
			this.#logPath = path.join(__dirname, 'logs', 'log.json');
		}
		this.#logPath = path;	
	}
	async log(err){
		const errBody = JSON.stringify({
			title: err.title,
			statusCode: err.status,
			msg: err.msg,
			trace: err.trace
		})		
		try{
			await fs.writeFile(this.#logPath, errBody);	
			return "done";
		}catch(err){
			throw err;
		}	
	}
}
