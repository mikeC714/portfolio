import { describe, it, after, beforeEach, afterEach, mock } from "node:test";
import { test_db } from "../../config/postgres.config.js";
import { Request } from "supertest";
import assert from "node:assert";
import app from "../../server.js";


describe("POST /api/auth/signup", () =>{
	const req = new Request(app);
	const mockUser = {username:"fake_user", password: "fake_pass"};

	it("Successfully creates new user", async() =>{
		const res = await req
						.post('/api/auth/signup')
						.set('Content-Type', 'application/json')
						.send(mockUser);
		assert.strictEqual(res.status, 201);
	})

	after(async() => {
		await test_db.query(
			`TRUNCATE users CASCADE`
		)	
	})
})
