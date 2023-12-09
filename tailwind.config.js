/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				dark: {
					50: '#211e54',
					// 100: '#1e1b4b',
					100: '#191742',
					200: '#10102e',
				},
				pink: {
					20: '#ece1f7',
					25: '#e8bae2',
					50: '#ab9bc4',
					100: '#7a729c',
				},
				red: {
					100: 'red',
				},

				cover: {
					dark: '#10102ee6',
					light: '#6e639fb3',
				},
			},
			fontFamily: {
				nunito: ['var(--font-nunito)', ...fontFamily.sans],
				dance: ['var(--font-dancing)', ...fontFamily.sans],
				roboto: ['var(--font-roboto)', ...fontFamily.sans],
			},
		},
	},
	plugins: [],
};
