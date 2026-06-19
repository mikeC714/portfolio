class AppError extends Error{
	constructor(message, statusCode){
		super(message);
		this.statusCode = statusCode;
		this.name = "App Error";
	}
}

class AuthenticationError extends AppError{
	constructor(message){
		super(message);
		this.statusCode = 401;
		this.name = "Authentication Error"
	}
}


export{ AuthenticationError, AppError }
