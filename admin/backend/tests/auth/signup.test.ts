import { describe, it, after, beforeEach, afterEach } from "node:test";
import { test_db } from "../../config/postgres.config.ts"
import { redisClient } from "../../config/redis.config.ts";
import  request  from "supertest";
import assert from "node:assert";
import app from "../../server.ts";


describe("POST /api/auth/signup", () =>{
	const req = request(app);
		const mock = {
			username:"fake_user",
			password: "fake_pass", 
			secret: process.env.SECRET,
		};
	const func = async(over?:any):Promise<any> =>{
		const mockUser = {
			username:"fake_user",
			password: "fake_pass", 
			secret: process.env.SECRET,
			...over
		};
		return await req 
					.post('/api/auth/signup')
					.set('Content-Type', 'application/json')
					.send(mockUser);
	}

	afterEach(async() =>{
		await test_db.query(`TRUNCATE users CASCADE`);
	})

	it("Successfully creates new user", async() => {
		const res = await func(); 
		assert.strictEqual(res.status, 201);
	})

	describe("FAIL POST /api/auth/signup due to duplicate", () =>{
		beforeEach(async() => {
			await test_db.query(
				`INSERT INTO users(username, password)
					VALUES($1,$2)
				`,[mock.username, mock.password]
			)
		})
		it("Existing user.", async() =>{
			const res = await func(); 
			assert.strictEqual(res.status, 500);
		})
	})

	describe("FAIL POST /api/auth/signup due to invalid secret", () =>{
		it("Invalid Secret.", async() =>{
			const res = await func({ secret:"super_duper_secret" }) 
			assert.strictEqual(res.status, 401);
		})
	})

	after(async() => {
		await test_db.query(`TRUNCATE users CASCADE`);	
		await test_db.end()
		await redisClient.quit();
	})
})
