import { signout } from "@/src/lib/actions"
import { serverAuthHelper } from "@/src/lib/edgedb/server"
import { action, redirect, cache, reload } from "@solidjs/router"
import e from "@/dbschema/edgeql-js"

export const handleSignOut = action(() => {
	"use server"
	signout()
	throw redirect("/")
})

export const checkSignedIn = cache(async () => {
	"use server"
	const singedIN = await serverAuthHelper.getSession().isSignedIn()
	if (!singedIN) {
		throw redirect(serverAuthHelper.getBuiltinUIUrl())
	}
	return singedIN
}, "checkSignedIn")

export const addItemAction = action(async (name: string) => {
	"use server"
	const session = serverAuthHelper.getSession()

	const newItemQuery = e.insert(e.Item, {
		name,
	})

	newItemQuery.run(session.client)
})

export const getItems = cache(async () => {
	"use server"
	const itemsQuery = e.select(e.Item, (_item) => ({
		id: true,
		name: true,
		created: true,
		updated: true,
		created_by: {
			name: true,
			email: true,
		},
	}))

	return itemsQuery.run(serverAuthHelper.getSession().client)
}, "items")

export const deleteItem = action(async (id: string) => {
	"use server"
	const session = serverAuthHelper.getSession()
	const res = await session.client.query("DELETE Item FILTER .id = <uuid>$id", {
		id,
	})

	if (res.length === 0) {
		return "Cannot delete item"
	}

	reload({
		revalidate: getItems.key,
	})

	return null
})
