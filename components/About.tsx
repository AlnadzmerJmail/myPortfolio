import React from 'react';

import Me from './Me';
import '../dist/about.css';

function About({ theme }: { theme?: string }) {
	return (
		<section
			id="about"
			className="w-full flex flex-wrap pb-5 md:pb-10 bg-white dark:bg-dark-100"
		>
			{/* My Image */}
			<Me />
			<div className="w-full md:w-1/2 flex flex-wrap items-center p-5 md:pl-[70px] md:pr-[150px]">
				<div>
					<span className="w-full block text-left md:text-left uppercase text-lg font-nunito font-bold mb-5 md:mb-7 text-pink-500 dark:text-purple-800 red-700">
						About
					</span>
					<h3
						className={`w-full text-3xl md:text-6xl font-nunito font-black ${
							theme || 'dark'
						}-my-name`}
					>
						Alnadzmer Jamil
					</h3>
					<span className="w-full block text-left text-xs md:text-base font-nunito font-bold pb-5 md:pt-3  uppercase text-indigo-300 dark:text-pink-50 fullstackkk">
						__ Fullstack Web Developer
					</span>
					<p className="w-full font-nunito text-lg md:text-xl text-pink-400 dark:text-pink-100">
						My extensive experience in frontend development has fueled my
						inspiration to venture into backend and conquer web technologies. I
						am actively seeking opportunities in{' '}
						<span className="text-indigo-300 dark:text-pink-50 fullstackkk">
							Fullstack Web Development
						</span>{' '}
						and I am eager to collaborate with like-minded individuals who share
						a common passion and vision for pushing the boundaries of web
						technologies.
					</p>
				</div>
			</div>
		</section>
	);
}

export default About;
