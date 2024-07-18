import NextSteps from "@/src/components/NextSteps"
import { clientAuthHelper } from "@/src/lib/edgedb/client"
import { A, cache, createAsync } from "@solidjs/router"
import { Show } from "solid-js"
import { serverAuthHelper } from "../lib/edgedb/server"

const isSignedIn = cache(async () => {
	"use server"
	return serverAuthHelper.getSession().isSignedIn()
}, "isSignedIn")

export const route = {
	load: () => isSignedIn(),
}

export default function Home() {
	const signedIn = createAsync(() => isSignedIn())

	return (
		<div>
			<header class="absolute inset-x-0 top-0 z-50">
				<nav
					class="flex items-center justify-between p-6 lg:px-8"
					aria-label="Global"
				>
					<div class="flex flex-1 justify-end space-x-2">
						<Show
							when={signedIn()}
							fallback={
								<>
									<A
										href={clientAuthHelper.getBuiltinUIUrl()}
										target="_self"
										class="text-sm font-semibold leading-6 text-gray-800"
									>
										<button class="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md">
											Sign in
										</button>
									</A>
									<A
										href={clientAuthHelper.getBuiltinUISignUpUrl()}
										target="_self"
										class="text-sm font-semibold leading-6 text-gray-900"
									>
										<button class="bg-primary px-4 py-2 rounded-md text-white">
											Sign up
										</button>
									</A>
								</>
							}
						>
							<A
								href="dashboard"
								class="text-sm font-semibold leading-6 text-gray-900"
							>
								<button class="bg-primary px-4 py-2 rounded-md text-white">
									Dashboard
								</button>
							</A>
						</Show>
					</div>
				</nav>
			</header>

			<div class="relative isolate px-6 py-14 lg:px-8">
				<div class="mx-auto max-w-2xl pt-16 sm:pt-24 lg:pt-32">
					<div class="text-center">
						<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							EdgeDB Solid Start Starter
						</h1>
						<p class="mt-6 text-base leading-7 text-gray-600">
							Welcome to the EdgeDB Solid Start Starter. This starter is
							designed to help you get up and running with EdgeDB and Solid
							Start quickly. It includes a basic setup for authentication,
							EdgeDB schema, and a UI to get you started. Below are some next
							steps to help you get up to speed.
						</p>
					</div>
				</div>
				<div class="mx-auto max-w-2xl pt-4 sm:pt-8 lg:pt-12">
					<NextSteps />
				</div>
			</div>
		</div>
	)
}
