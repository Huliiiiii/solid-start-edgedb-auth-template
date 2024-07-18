import { createClient } from "edgedb"
import { SolidServerAuth } from "edgedb-auth-solid-start/server"

export const client = createClient({
	// Note: when developing locally you will need to set tls security to
	// insecure, because the development server uses self-signed certificates
	// which will cause api calls with the fetch api to fail.
	tlsSecurity: process.env.NODE_ENV === "development" ? "insecure" : undefined,
})

export const serverAuthHelper = new SolidServerAuth(client, {
	baseUrl: "http://localhost:3000",
})
