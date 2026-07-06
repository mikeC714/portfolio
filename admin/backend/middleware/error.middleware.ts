class AppError extends Error{
	readonly statusCode:number;
	constructor(message:string, statusCode:number){
		super(message);
		this.statusCode = statusCode;
		this.name = "App Error";
	}
}

class AuthenticationError extends AppError{
	constructor(message:string, statusCode:number = 401){
		super(message, statusCode);
		this.message = message;
		this.name = "Authentication Error"
	}
}

class AccessError extends AppError{
	constructor(message:string, statusCode:number = 401){
		super(message, statusCode);
		this.message = message;
		this.name = "Access Error"
	}
}


export{ AuthenticationError, AppError, AccessError }
