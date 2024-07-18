import { A, reload } from "@solidjs/router"
import { createSignal } from "solid-js"

export default function AddItem(props: {
	addItem: (name: string) => Promise<void>
}) {
	const [itemName, setItemName] = createSignal("")
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await props.addItem(itemName())
				setItemName("")
				reload()
			}}
		>
			<div class="space-y-12">
				<div class="pb-4 border-b border-gray-200">
					<h2 class="text-xl font-semibold leading-1 text-gray-900">
						New Item
					</h2>

					<div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div class="sm:col-span-4">
							<label
								for="name"
								class="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div class="mt-2">
								<div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
									<input
										type="text"
										name="name"
										id="name"
										class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="test item"
										value={itemName()}
										onChange={(e) => setItemName(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center gap-x-6">
				<A href="/dashboard">
					<button
						type="button"
						class="text-sm font-semibold leading-6 text-gray-900"
					>
						Cancel
					</button>
				</A>
				<button
					type="submit"
					class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				>
					Save
				</button>
			</div>
		</form>
	)
}
