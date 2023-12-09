'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useTheme } from 'next-themes';
import * as NProgress from 'nprogress';

import ScrollLink from './ScrollLink';

import '../dist/navbar-style.css';

function Navbar() {
	// theme
	const { theme, setTheme } = useTheme();

	const pathname = usePathname();

	// state
	const [isHumburgerOpen, setIsHumburgerOpen] = useState(false);
	const [borderBottom, setborderBottom] = useState('');

	useEffect(() => {
		setTheme('dark');
	}, []);

	useEffect(() => {
		const handleScroll = (e: any) => {
			const top = window.scrollY;

			if (borderBottom && top < 682) setborderBottom('');

			if (!borderBottom && top > 682) setborderBottom('colored-nav');
		};
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [borderBottom]);

	useEffect(() => {
		NProgress.done();
	}, [pathname]);

	const toggleBackgroundTheme = (e: any) => {
		if (e.target.innerText) return;
		if (!theme || theme === 'dark') setTheme('light');
		else setTheme('dark');

		setIsHumburgerOpen(!isHumburgerOpen);
	};

	return (
		<>
			<header
				className={`sticky top-0 h-20 flex flex-nowrap items-center z-50 ${borderBottom} ${
					theme || 'dark'
				}`}
			>
				<nav className="w-full flex justify-between items-center px-5 md:px-[40px] ">
					<div
						className={`md:hidden container__humburger flex flex-col relative  ${
							isHumburgerOpen ? 'open-hamburger' : ''
						}`}
						onClick={() => setIsHumburgerOpen(!isHumburgerOpen)}
					>
						{/* to create humburger-menu */}
						{Array.from({ length: 5 }).map((_, index) => (
							<span key={index} />
						))}
					</div>

					<NavsList
						className={`hidden md:flex`}
						listClassName={`text-white uppercase cursor-pointer mx-3 nav-list-${
							theme || 'dark'
						}`}
						theme={theme || 'dark'}
						isColoredNav={borderBottom}
						toggleBackgroundTheme={toggleBackgroundTheme}
					/>

					<div className="div align-middle">
						<button
							className={`inline-block py-2 px-4 text-sm font-nunito uppercase contact-btn-${
								theme || 'dark'
							}`}
						>
							<ScrollLink href="/#contact">Contact</ScrollLink>
						</button>
					</div>
				</nav>

				<NavsList
					className={`md:hidden mobile-nav-options__wrapper px-5 py-4  ${
						isHumburgerOpen ? 'mobile-nav-open' : 'mobile-nav-closed'
					}`}
					listClassName="pb-1.5"
					theme={theme || 'dark'}
					toggleBackgroundTheme={toggleBackgroundTheme}
				/>
			</header>
		</>
	);
}

const NavsList = ({
	className,
	listClassName,
	theme,
	isColoredNav,
	toggleBackgroundTheme,
}: {
	className: string;
	listClassName: string;
	isColoredNav?: string;
	theme: string;
	toggleBackgroundTheme: (e: any) => void;
}) => {
	const [pathname, setPathname] = useState('');

	useEffect(() => {
		setPathname(location.pathname);
	}, []);

	const spanClassName = 'text-white font-nunito uppercase cursor-pointer';
	return (
		<ul className={className}>
			{['About', 'Work'].map((e, i) => (
				<li
					key={i}
					className={`${listClassName} ${listClassName}--${pathname.slice(
						1
					)} ${listClassName}${isColoredNav ? '--on-colored-nav' : ''}`}
				>
					<span className={spanClassName}>
						<ScrollLink href={`/#${e.toLowerCase()}`}>{e}</ScrollLink>
					</span>
				</li>
			))}
			<li
				className={
					listClassName.slice(0, listClassName.length - 9) // remove 'nav-list'
				}
			>
				<span className={spanClassName} onClick={toggleBackgroundTheme}>
					<ToggleIcon theme={theme} />
				</span>
			</li>
		</ul>
	);
};

const ToggleIcon = ({ theme }: { theme: string }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth="1.5"
		stroke="currentColor"
		className={`w-6 h-6 toggle-icon--${theme}`}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d={
				theme === 'dark'
					? 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
					: 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
			}
		/>
	</svg>
);

export default Navbar;
