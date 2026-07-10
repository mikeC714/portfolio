import { describe, it, after, beforeEach, afterEach } from "node:test";
import { test_db } from "../../config/postgres.config.ts"
import bcrypt from "bcrypt";
import { redisClient } from "../../config/redis.config.ts";
import  request  from "supertest";
import assert from "node:assert";
import app from "../../server.ts";

describe("POST /api/about-me/add", () =>{
	const req = request.agent(app);
	const mock = {username:"fake_user", password: "fake_pass", role: "admin", secret:process.env.SECRET};

	beforeEach(async() =>{	
		const safe = await bcrypt.hash(mock.password, 0);
		await test_db.query(
			`INSERT INTO users(username, password, role)
				VALUES($1,$2,$3)
			`, [mock.username, safe, mock.role]
		);
		const res = await req
						.post("/api/auth/login")
						.set("Content-Type","application/json")
						.send(mock);
		assert.strictEqual(res.status, 200);
	})

	const func = async(over?:any):Promise<any> => {
		const data = {
			bio: "Hello World!",
			dob: "2004-07-14",
			stack:[
				{ name:"JavaScript", projectNum: 10, status: 70 },
				{ name:"Rust", projectNum: 0, status: 5 },
				{ name:"GO", projectNum: 0, status: 15 },
				{ name:"Python", projectNum: 0, status: 15 }
			], 
			img:"",
			...over
		};	
		return await req
					.post("/api/about-me/add")
					.set("Content-Type", "application/json")
					.send(data)
	}

	it("Happy Path, should return all columns", async() => {
		const res = await func();
		console.log(res);
		assert.strictEqual(res.status, 200);
	})


	afterEach(async() => {
		await test_db.query(`TRUNCATE users CASCADE`);
		await test_db.end();
		await redisClient.quit();
	})
})
