import { serverAuthHelper } from "./edgedb/server"
const authActions = serverAuthHelper.createServerActions()

export const { signout } = authActions
