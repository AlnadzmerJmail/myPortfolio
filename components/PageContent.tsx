'use client';
import { useTheme } from 'next-themes';

import About from './About';
import Work from './Work';
import Contact from './Contact';

function PageContent() {
	// theme
	const { theme } = useTheme();

	return (
		<main className={`home-page ${theme || 'dark'}`}>
			<section className={`home-page__intro w-full -z-40 ${theme || 'dark'}`}>
				<div className="text-center">
					<span className="text-3xl md:text-8xl font-nunito font-extrabold">
						Programming Today,
					</span>
					<span className="text-4xl py-3 md:text-8xl font-dance font-extrabold md:pt-3">
						Shaping a
					</span>
					<span className="text-3xl md:text-8xl font-nunito font-extrabold  md:pt-3">
						Seamless Tomorrow
					</span>
				</div>
			</section>
			<About />
			<Work />
			<Contact />
		</main>
	);
}

export default PageContent;
