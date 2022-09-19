/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./lib/components/**/*.{js,ts,jsx,tsx}",
		"./lib/layouts/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
