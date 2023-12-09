import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// components
import Technologies from './project/Technologies';
import Previews from './project/Previews';

import '../dist/project.css';

type ProjectPropsType = {
	data: {
		main?: {
			image: string;
			title: string;
			subTitle: string;
			date: string;
			link: string;
			description: string;
			story: string;
		};
		stacks?: string[];
		previews?: {
			name: string;
			title: string;
			description: string;
			image: string;
		}[];
	};
};

function Project({ data }: ProjectPropsType) {
	const { main, stacks, previews } = data;

	return (
		<main className="project w-full bg-pink-20 dark:bg-dark-100 after:bg-pink-20 dark:after:bg-dark-100">
			<section className="h-[100vh] m-auto relative p-5 pt-[65px]">
				<div className="w-full md:w-3/4 m-auto mt-5 md:mt-10 relative z-20">
					<h1 className="text-3xl md:text-4xl text-white font-nunito font-extrabold mb-2">
						{main?.title}
					</h1>

					<p className="text-base md:text-lg font-semibold text-white font-nunito mb-2">
						{main?.subTitle}
					</p>
					<p className="font-nunito font-bold text-base mb-5 text-pink-50 dark:text-pink-100">
						{main?.date}
					</p>
					<p className="text-base md:text-lg font-semibold text-white font-nunito mb-3">
						{main?.description}
					</p>
					<p className="text-base md:text-lg font-semibold text-white font-nunito mb-5">
						{main?.story}
					</p>

					<div className="flex gap-10 justify-center md:justify-start mt-0 md:mt-20 font-bold font-nunito text-pink-50 dark:text-pink-100">
						<Link
							href="/#work"
							className="project__link flex flex-wrap relative z-20"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 project__arrow-left project__arrow-left--hovered relative"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
							<span className="">Back</span>
						</Link>

						<Link
							href={main?.link || '#'}
							target="_blank"
							className="project__link flex flex-wrap relative z-20"
						>
							<span className="">Visit</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 project__arrow-right project__arrow-right--hovered relative"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</Link>
					</div>
				</div>
				<Image src={main?.image || ''} alt="project-img" fill className="z-0" />
				<div className="project__cover dark:bg-cover-dark  z-10" />
			</section>

			<Technologies stacks={stacks || []} />
			<Previews previews={previews || []} />
		</main>
	);
}

export default Project;
