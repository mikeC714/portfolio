interface Database{
	query<T>(
		sql: string, 
		params?: any[]
	):Promise<{rows: T[]}>
}

export default Database;
