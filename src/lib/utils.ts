import { createMemo } from "solid-js";


export function classNames(...classes: (string | boolean | undefined)[]) {
	return createMemo(() => classes.filter(Boolean).join(" "))
}
