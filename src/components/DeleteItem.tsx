import { Action, useAction } from "@solidjs/router"
import { Icon } from "solid-heroicons"
import { trash } from "solid-heroicons/outline"

type P = {
	item: { id: string }
	deleteAction: Action<[string], string | null>
}
export default function DeleteItem(props: P) {
	const deleteItem = useAction(props.deleteAction)
	return (
		<button
			type="button"
			class="text-sm font-semibold text-red-600 mt-2"
			onClick={async () => {
				const error = await deleteItem(props.item.id)
				if (error) {
					alert(error)
					return
				}
			}}
		>
			<Icon path={trash} class="w-4 h-4" />
			<span class="sr-only">Delete</span>
		</button>
	)
}
