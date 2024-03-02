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
					<span className="text-3xl md:text-8xl font-extrabold font-nunito">
						Programming Today,
					</span>
					<span
						className={`text-4xl py-3 md:text-8xl font-bold md:pt-3 font-dance`}
					>
						Shaping a
					</span>
					<span className="text-3xl md:text-8xl font-extrabold  md:pt-3 font-nunito">
						Seamless Tomorrow
					</span>
				</div>
			</section>
			<About theme={theme} />
			<Work theme={theme} />
			<Contact />
		</main>
	);
}
