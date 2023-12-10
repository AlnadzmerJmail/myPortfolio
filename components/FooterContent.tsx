'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ScrollLink from './ScrollLink';

import { useTheme } from 'next-themes';
import '../dist/footer.css';

type FooterContentType = {
	env: {
		GITHUB_URL?: string;
		LINKEDIN_URL?: string;
		FACEBOOK_URL?: string;
	};
};

function FooterContent({ env }: FooterContentType) {
	const { GITHUB_URL, LINKEDIN_URL, FACEBOOK_URL } = env;

	const params = useSearchParams();
	const paramsName = params.get('name');

	// theme
	const { theme } = useTheme();

	const now = new Date();
	const year = now.getFullYear();

	// icons are from tabler icons
	const icons = [
		{
			name: 'github',
			link: GITHUB_URL,
			icon: iconsObj.github,
		},
		{
			name: 'linkedIn',
			link: LINKEDIN_URL,
			icon: iconsObj.linkedIn,
		},
		{
			name: 'facebook',
			link: FACEBOOK_URL,
			icon: iconsObj.facebook,
		},
	];

	return (
		<>
			<ul
				className={`${
					theme || 'dark'
				} footer__list sm:w-full md:w-3/5  m-auto flex justify-center gap-4 md:gap-10 uppercase text-sm py-10`}
			>
				{navs.map((nav) => {
					let href,
						id,
						otherProps = {};

					if (nav === 'source code') {
						if (paramsName) {
							href = sourceCodes[paramsName];
							otherProps = { target: '_blank' };
						} else href = '/portfolio';
					} else {
						if (paramsName) id = 'nothing';
						href = `/#${nav}`;
					}

					return (
						<ScrollLink
							key={nav}
							id={id}
							href={href}
							{...otherProps}
							className="cursor-pointer font-nunito text-pink-50 dark:text-pink-100 hover:text-pink-100 dark:hover:text-pink-50 transition-all delay-75"
						>
							{nav}
						</ScrollLink>
					);
				})}
			</ul>
			<div className="flex flex-wrap justify-center items-start  gap-x-3 pt-2">
				<p className="footer__copyright w-full text-center font-roboto font-extralight text-sm uppercased py-4 text-white dark:text-pink-100">
					&copy; {year} Alnadzmer Mabbol Jamil
				</p>
				{icons.map((icon) => (
					<Link
						key={icon.link}
						href={icon.link || '#'}
						target="_blank"
						className="p-1 rounded-sm bg-pink-50 dark:bg-pink-100 hover:bg-pink-100 dark:hover:bg-pink-50 transition-all delay-75 duration-100"
					>
						{icon.icon}
					</Link>
				))}
			</div>
		</>
	);
}

export default FooterContent;

const navs = ['about', 'work', 'contact', 'source code'];
// icons are from tabler icons
const iconsObj = {
	github: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-brand-github"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
		</svg>
	),
	linkedIn: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-brand-linkedin"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
			<path d="M8 11l0 5" />
			<path d="M8 8l0 .01" />
			<path d="M12 16l0 -5" />
			<path d="M16 16v-3a2 2 0 0 0 -4 0" />
		</svg>
	),
	facebook: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-brand-facebook"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
		</svg>
	),
};

const sourceCodes: Record<string, string> = {
	philex: '/#',
	comepers: 'https://github.com/AlnadzmerJmail/ComePers',
	prodev: 'https://github.com/AlnadzmerJmail/ProDev',
	rmtdev: 'https://github.com/AlnadzmerJmail/rmtDev',
	corpcmt: 'https://github.com/AlnadzmerJmail/CorpComment',
	btrphotos: 'https://github.com/AlnadzmerJmail/BetterPhotos',
	scleditor: 'https://github.com/AlnadzmerJmail/YourSclEditor',
};
