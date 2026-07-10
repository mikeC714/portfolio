import { describe, it, after, beforeEach, afterEach } from "node:test";
import { test_db } from "../../config/postgres.config.ts";
import { redisClient } from "../../config/redis.config.ts";
import bcrypt from "bcrypt";
import  request  from "supertest";
import assert from "node:assert";
import app from "../../server.ts";


describe("POST /api/auth/login", () => {
	const req = request(app);
		const mock = {username:"fake_user", password: "fake_pass"};

	beforeEach(async() => {
		const safe = await bcrypt.hash(mock.password, 4);
		await test_db.query(
			`INSERT INTO users(username, password, role)
				VALUES($1, $2, $3)
			`,[mock.username, safe, "admin"]
		)
	})

	afterEach(async() => {
		await test_db.query(`TRUNCATE users CASCADE`)
	})

	const func = async(over?:any):Promise<any> => {
		const mockUser = {
				username:"fake_user",
				password: "fake_pass",
				secret:process.env.SECRET,
				...over
			};
		return await req
			.post("/api/auth/login")
			.set('Content-Type', 'application/json')
			.send(mockUser)
	}


	it("Should successfully login user", async() => {
		const res = await func();
		assert.strictEqual(res.status, 200);
	}) 
	describe("FAIL POST /api/auth/login", () => {
		it("Should fail due to invalid creds", async() => {
 			const res = await func({ username:"Joe_shmoe" })	
			assert.strictEqual(res.status, 401);
		})
		it("Should fail due to an invalid secret", async() => {
			const res = await func({ secret: "ahhhhhhh" });
			assert.strictEqual(res.status, 401);
		})
	})
	after(async() => {
		await test_db.query(`TRUNCATE users CASCADE`)
		await test_db.end();
		await redisClient.quit();
	})
})
