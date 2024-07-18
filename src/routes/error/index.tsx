import { useSearchParams } from "@solidjs/router"
import { Match, Switch } from "solid-js"

export default function Page() {
	const [searchParams] = useSearchParams()
	return (
		<Switch fallback={<div>Error</div>}>
			<Match when={searchParams.error === "auth-failed"}>
				<div>
					Error: Sometime went wrong when authenticating. Check the console for
					more details.
				</div>
			</Match>
			<Match when={searchParams.error === "email-verification-required"}>
				<div>Error: Email verification required.</div>
			</Match>
		</Switch>
	)
}
