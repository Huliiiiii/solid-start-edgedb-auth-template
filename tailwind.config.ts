import type { Config } from "tailwindcss"
import _colors from "tailwindcss/colors"

const colors = {
	..._colors,
	lightBlue: undefined,
	warmGray: undefined,
	trueGray: undefined,
	coolGray: undefined,
	blueGray: undefined,
}

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
    // @ts-expect-error
		colors: {
			...colors,
			primary: "rgb(14 128 95)",
			primarylight: "rgb(248 255 253)",
			primaryhover: "rgb(35 157 122)",
		},
	},
	plugins: [require("@tailwindcss/forms")],
}
export default config
