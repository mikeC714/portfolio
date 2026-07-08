import{ describe, it, after, beforeEach, afterEach } from "node:test";
import { test_db } from "../../config/postgres.config.js";
import  request  from "supertest";
import assert from "node:assert";
import app from "../../server.js";


describe("DELETE /api/auth/delete", () => {
	const req = request(app);
	const mock = {username:"fake_user", password: "fake_pass"};

	beforeEach(async() => {
		await test_db.query(
			`INSERT INTO users(username, password, role)
				VALUES($1,$2,$3)
			`,[mock.username, mock.password, "admin"]
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
				role: "admin",
				...over
			};
		return await req
			.delete("/api/auth/delete")
			.set('Content-Type', 'application/json')
			.send(mockUser)
		}

	it("Should successfully delete user", async() => {
		const res = await func();
		assert.strictEqual(res.status, 200);
	})

	describe("FAIL /api/auth/delete", () => {
		it("Should fail due to invalid role", async() => {
			const res = await func({ role: "nothing" });
			assert.strictEqual(res.status, 401);
		})	
	})


})
