import { Lang, Framework, Stack } from "../src/types/stack.ts";
import { db } from "../config/postgres.config.ts";
import { AuthenticationError } from "../middleware/error.middleware.ts"; 

// {
//   lang: [
//     {
//       id: "lang-1",
//       name: "JavaScript",
//       status: "active",
//       projectNum: 5,
//       frameworks: [
//         { lang_id: "lang-1", name: "React", status: "active" },
//         { lang_id: "lang-1", name: "Vue", status: "deprecated" }
//       ]
//     },
//     {
//       id: "lang-2",
//       name: "Python",
//       status: "active",
//       projectNum: 3,
//       frameworks: [
//         { lang_id: "lang-2", name: "Django", status: "active" }
//       ]
//     }
//   ]
// }

export default{
	async add(userId:string,lang:Lang){
		if(!userId) throw new AuthenticationError("Failed to provide userId inorder to get project");
		try{
			await db.query(
				`INSERT INTO stack
					VALUES($1,$2)	
				`),[userId, lang]
		}catch(err){
			throw err;
		}
	},
	async getStack(userId:string):Promise<Stack | null>{
		if(!userId) throw new AuthenticationError("Failed to provide userId inorder to get project");
		try{
			const results = await db.query(
				`SELECT 
					lang.id,
					lang.name,
					lang.status,
					lang.projectNum
						COALESCE(
							jsonb_agg(
								jsonb_build_object(
									'lang_id' frameworks.lang_id,
									'name' frameworks.name,
									'status' frameworks.status,
								)
							) FILTER (WHERE framworks.id IS NOT NULL),'[]'::jsonb
						) AS frameworks
					FROM languages AS lang
					LEFT JOIN frameworks ON lang.id = frameworks.lang_id
					WHERE lang.user_id = $1
					GROUP BY lang.id, lang.name, lang.status, lang.projectNums
				`,[userId]
			);
			if(results.rows.length === 0) return null; 
			return results.rows as any;
		}catch(err){
			throw err;
		}
	},
	async updateLang(lang:Lang){
		try{
			await db.query(
				`INSERT INTO languages (id, name, status, projectNum)
					VALUES($1,$2,$3,$4)	
					ON CONFLICT (name)
					DO UPDATE SET 
						status = EXCLUDED.status,
						projectNum = EXCLUDED.projectNum
					WHERE languages.status IS DISTINCT FROM EXCLUDED.status
					OR languages.projectNum IS DISTINCT FROM EXCLUDED.projectNum
				`,[lang.id, lang.name, lang.status, lang.projectNum]
			)
		}catch(err){
			throw err;
		}
	},
	async updateFramework(framework:Framework){
		try{
			await db.query(
				`INSERT INTO  frameworks(id, name, status)
					VALUES($1,$2,$3)	
					ON CONFLICT (name)
					DO UPDATE SET 
						status = EXCLUDED.status
					WHERE frameworks.status IS DISTINCT FROM EXCLUDED.status
				`,[framework.id,framework.name,framework.status]
			)		
		}catch(err){
			throw err;
		}
	},
	
}
