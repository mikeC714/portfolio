interface User{
	first_name?:string | null,
	last_name?:string | null,
	username: string,
	password: string,
	secret?: string,
	role: string,
}
export default User;
