export class Logger{
	constructor(){
		
	}
	async log(err: any){
		const { message, statusCode, trace } = err;
		return JSON.stringify({
			statusCode,
			message,
			trace
		})
	}
}
