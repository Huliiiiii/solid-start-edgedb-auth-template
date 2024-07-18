import { Item } from "@/dbschema/interfaces"
import { Index } from "solid-js"
import DeleteItem from "./DeleteItem"
import { deleteItem } from "../routes/(dashboard)/data"

interface Props {
	items: (Omit<Item, "created_by"> & {
		created_by: {
			name: string
			email: string | null
		}
	})[]
}

export default function ItemList(props: { items: Props["items"] }) {
	return (
		<ul role="list" class="divide-y divide-gray-200">
			<Index each={props.items}>
				{(item) => (
					<li class="flex gap-x-4 py-5">
						<div class="flex-auto">
							<div class="flex items-baseline justify-between gap-x-4">
								<p class="text-sm font-semibold leading-6 text-gray-900">
									{item().name}
								</p>
								<p class="flex-none text-xs text-gray-600">
									<time dateTime={item().updated?.toLocaleDateString()}>
										{item().updated?.toLocaleDateString()}
									</time>
								</p>
							</div>
							<div>
								<p class="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
									Author: {item().created_by.email}
								</p>
								<DeleteItem item={item()} deleteAction={deleteItem} />
							</div>
						</div>
					</li>
				)}
			</Index>
		</ul>
	)
}
