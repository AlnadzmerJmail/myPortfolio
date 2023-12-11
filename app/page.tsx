'use client';
import { useTheme } from 'next-themes';

import About from '@/components/About';
import Work from '@/components/Work';
import Contact from '@/components/Contact';

import '../dist/home.css';

export default function Home() {
	// theme
	const { theme } = useTheme();

	return (
		<main className={`home-page ${theme || 'dark'}`}>
			<section className={`home-page__intro w-full -z-40 ${theme || 'dark'}`}>
				<div className="text-center mb-10 md:mb-0">
					<span className="text-3xl md:text-8xl font-nunito font-extrabold">
						Programming Today,
					</span>
					<span className="text-4xl py-3 md:text-8xl font-dance font-bold md:pt-3">
						Shaping a
					</span>
					<span className="text-3xl md:text-8xl font-nunito font-extrabold  md:pt-3">
						Seamless Tomorrow
					</span>
				</div>
			</section>
			<About theme={theme} />
			<Work />
			<Contact />
		</main>
	);
}
