import { A } from "@solidjs/router"
import { Icon } from "solid-heroicons"
import {
	bars_3,
	buildingStorefront,
	userCircle,
	xMark,
} from "solid-heroicons/outline"
import { createSignal, For, Index, onMount } from "solid-js"
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuItem,
	Transition,
} from "terracotta"
import { classNames } from "../lib/utils"

const navigation = [
	{ name: "Dashboard", href: "/dashboard", current: true },
	{ name: "Page #1", href: "#", current: false },
	{ name: "Page #2", href: "#", current: false },
]

type NavBarProp = {
	signedIn: boolean
	onSignOut: () => Promise<unknown>
}
export default function Navbar(props: NavBarProp) {
	const handleSignOut = () => {
		props.onSignOut()
	}
	onMount(() => {
		console.log("signedIn", props.signedIn)
	})
	const [isOpen, setOpen] = createSignal(false)
	return (
		<Disclosure
			as="nav"
			class="border-b border-gray-200 bg-white"
			defaultOpen={false}
		>
			{(disclosureProps) => (
				<>
					<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div class="flex h-16 justify-between">
							<div class="flex">
								<div class="flex flex-shrink-0 items-center mt-2">
									<A href="/">
										<Icon
											path={buildingStorefront}
											class="h-8 w-auto lg:block text-primary"
										/>
									</A>
								</div>
								<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
									<For each={navigation}>
										{(item) => (
											<a
												href={item.href}
												classList={{
													"border-primary text-gray-900": item.current,
													"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700":
														!item.current,
													"inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium":
														true,
												}}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</a>
										)}
									</For>
								</div>
							</div>
							<div class="hidden sm:ml-6 sm:flex sm:items-center">
								<Menu as="div" class="relative ml-3">
									<div>
										<MenuItem
											class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
											onClick={() => setOpen(!isOpen())}
										>
											<span class="absolute -inset-1.5" />
											<span class="sr-only">Open user menu</span>
											<Icon
												path={userCircle}
												class="h-8 w-8 text-gray-400 hover:text-gray-500"
											/>
										</MenuItem>
									</div>
									<Transition
										as={"div"}
										enter="transition ease-out duration-200"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
										show={isOpen()}
									>
										<MenuItem class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
											<DisclosureButton
												as="a"
												href="#"
												class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
											>
												Your Profile
											</DisclosureButton>
											<DisclosureButton
												as="button"
												class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
												onClick={handleSignOut}
											>
												Sign out
											</DisclosureButton>
										</MenuItem>
									</Transition>
								</Menu>
							</div>
							<div class="-mr-2 flex items-center sm:hidden">
								<DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
									<span class="absolute -inset-0.5" />
									<span class="sr-only">Open main menu</span>
									{disclosureProps.isOpen() ? (
										<Icon
											path={xMark}
											class="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<Icon
											path={bars_3}
											class="block h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel class="sm:hidden">
						<div class="space-y-1 pb-3 pt-2">
							<Index each={navigation}>
								{(item) => (
									<DisclosureButton
										as="a"
										href={item().href}
										class={classNames(
											item().current
												? "border-primary bg-gray-50 text-primary"
												: "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
											"block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
										)()}
										aria-current={item().current ? "page" : undefined}
									>
										{item.name}
									</DisclosureButton>
								)}
							</Index>
						</div>
						<div class="border-t border-gray-200 pb-3 pt-4">
							<div class="flex items-center px-4">
								<div class="flex-shrink-0">
									<Icon
										path={userCircle}
										class="h-8 w-8 text-gray-400 hover:text-gray-500"
									/>
								</div>
							</div>
							<div class="mt-3 space-y-1">
								<DisclosureButton
									as="a"
									href="#"
									class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
								>
									Your Profile
								</DisclosureButton>
								<DisclosureButton
									as="button"
									class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
									onClick={handleSignOut}
								>
									Sign out
								</DisclosureButton>
							</div>
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	)
}
