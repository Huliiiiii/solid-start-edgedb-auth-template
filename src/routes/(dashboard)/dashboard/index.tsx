import ItemList from "@/src/components/Items"
import { A, createAsync } from "@solidjs/router"
import { createEffect, Show } from "solid-js"
import { getItems } from "../data"

export default function Home() {
	const items = createAsync(() => getItems())
	createEffect(() => {
		console.log("hello")
		console.log(items())
	})
	return (
		<>
			<header class="flex justify-between items-center pb-4">
				<h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-900">
					Items
				</h1>
				<A href="/dashboard/new">
					<button class="bg-primary text-white px-3 py-2 rounded-md text-xs font-semibold">
						+ New Item
					</button>
				</A>
			</header>
			<Show when={items()} fallback={<p>Loading failed</p>}>
				{(items) => <ItemList items={items()} />}
			</Show>
		</>
	)
}
