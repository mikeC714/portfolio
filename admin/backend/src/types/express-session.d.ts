import "express-session";
import { CipherKey } from "crypto";


declare module "express-session"{
	interface SessionData{
		userId: string,
		username: string,
		role?: string | null,
		secret: CipherKey | CipherKey[]
	}
}
