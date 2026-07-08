import { describe, it, after, beforeEach, afterEach } from "node:test";
import { test_db } from "../../config/postgres.config.js";
import  request  from "supertest";
import assert from "node:assert";
import app from "../../server.js";


describe("POST /api/auth/signup", () =>{
	const req = request(app);
	const mockUser = {username:"fake_user", password: "fake_pass"};

	it("Successfully creates new user", async() =>{
		const res = await req
						.post('/api/auth/signup')
						.set('Content-Type', 'application/json')
						.send(mockUser);
		assert.strictEqual(res.status, 201);
	})

describe("POST /api/auth/signup Fail tests", () =>{
	beforeEach(async() =>{
		await test_db.query(
			`INSERT INTO users(username, password)
				VALUES($1,$2)
			`,[mockUser.username, mockUser.password]
		)
	})

	afterEach(async() =>{
		await test_db.query(`TRUNCATE users CASCADE`);
	})

	it("Should fail due to existing user.", async() =>{
		const res = await req
						.post('/api/auth/signup')
						.set('Content-Type', 'application/json')
						.send(mockUser);
		assert.strictEqual(res.status, 401);
	})
})

	after(async() => {
		await test_db.query(
			`TRUNCATE users CASCADE`
		)	
	})
})
