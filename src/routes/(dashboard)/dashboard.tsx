import Navbar from "@/src/components/Navbar"
import {
	createAsync,
	RouteSectionProps,
	useAction
} from "@solidjs/router"
import { Show, Suspense } from "solid-js"
import { checkSignedIn, handleSignOut } from "./data"

export const route = {
	load: () => checkSignedIn(),
}

export default function DashboardLayout(props: RouteSectionProps) {
	const signedIn = createAsync(() => checkSignedIn())
	const signOut = useAction(handleSignOut)

	return (
		<Suspense>
			<Show when={signedIn()}>
				{(signedIn) => (
					<div class="min-h-full">
						<Navbar signedIn={signedIn()} onSignOut={signOut} />
						<div class="relative isolate px-4 pt-8 sm:px-6 xl:px-16">
							<main>
								<div class="mx-auto max-w-7xl">{props.children}</div>
							</main>
						</div>
					</div>
				)}
			</Show>
		</Suspense>
	)
}
