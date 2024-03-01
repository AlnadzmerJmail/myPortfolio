import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Nunito, Dancing_Script, Roboto_Slab } from 'next/font/google';
import './globals.css';

// theme
import { ThemeProvider } from './themeProvider';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunitong',
});

const dancingScript = Dancing_Script({
	subsets: ['latin'],
	variable: '--font-dance',
});

const roboto = Roboto_Slab({
	subsets: ['latin'],
	variable: '--font-robotong',
});

const customFont = () =>
	`${dancingScript.variable} ${nunito.variable} ${roboto.variable}`;

export const metadata: Metadata = {
	title: 'AJ -- Portfolio',
	description: 'AJ Portfolio is buit in Next.js',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${customFont()} main`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<NextTopLoader height={2} showSpinner={false} color="#6428a8" />
					<Navbar />

					{children}

					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
