import { serverAuthHelper } from "@/src/lib/edgedb/server"
import { redirect } from "@solidjs/router"

export const { GET, POST } = serverAuthHelper.createAuthRouteHandlers({
	async onBuiltinUICallback({ error, tokenData, isSignUp }) {
		if (error) {
			console.error("Authentication failed: ", error)
			return redirect("/error?error=auth-failed")
		}

		if (!tokenData) {
			console.error("Email verification required.")
			return redirect("/error?error=email-verification-required")
		}

		if (isSignUp) {
			const client = serverAuthHelper.getSession({
				tokenData,
			}).client

			const emailData = await client.querySingle<{ email: string }>(`
	      SELECT ext::auth::EmailFactor {
	        email
	      } FILTER .identity = (global ext::auth::ClientTokenIdentity)
	    `)

			console.log("emailData: ", emailData)

			await client.query(`
	      INSERT User {
	        name := '',
	        email := '${emailData?.email}',
	        userRole := 'user',
	        identity := (global ext::auth::ClientTokenIdentity)
	      }
	    `)
		}

		return redirect("/")
	},
	async onSignout() {
		return redirect("/")
	},
})
