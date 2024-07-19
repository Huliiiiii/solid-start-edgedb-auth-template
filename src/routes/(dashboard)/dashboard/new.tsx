import AddItem from "@/src/components/AddItem"
import { A, useAction } from "@solidjs/router"
import { Icon } from "solid-heroicons"
import { arrowLeft } from "solid-heroicons/solid"
import { addItemAction } from "../data"

export default function Example() {
	const addItem = useAction(addItemAction)
	return (
		<>
			<A href="/dashboard">
				<button class="text-xs leading-6 text-gray-900">
					<Icon path={arrowLeft} class="h-4 w-4 inline-block" /> Back
				</button>
			</A>
			<div class="mt-4">
				<AddItem addItem={addItem} />
			</div>
		</>
	)
}
