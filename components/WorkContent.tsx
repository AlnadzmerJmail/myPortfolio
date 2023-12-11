'use client';
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import Image from 'next/image';

import { useRouter, usePathname } from 'next/navigation';
import * as NProgress from 'nprogress';

import { motion, useDragControls } from 'framer-motion';
import { useTheme } from 'next-themes';
import '../dist/work.css';

function WorkContent() {
	const router = useRouter();
	const pathname = usePathname();

	// theme
	const { theme } = useTheme();

	const ulRef = useRef<HTMLUListElement | null>(null);
	const dragControls = useDragControls();

	const [windowWidth, setWindowWidth] = useState(0);
	const [isDragged, setIsDragged] = useState(false);

	useLayoutEffect(() => {
		const windowWidth = window.innerWidth;

		setWindowWidth(windowWidth);

		const resize = ({ target }: any) => {
			setWindowWidth(target.window.innerWidth);
		};
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	useEffect(() => {
		const ulElement = ulRef.current;

		if (ulElement) {
			ulElement.addEventListener('mouseover', (e) => {
				ulElement.style.cursor = 'pointer';
			});

			ulElement.addEventListener('mouseout', () => {
				ulElement.style.cursor = 'auto';
			});
		}
	}, [ulRef]);

	useEffect(() => {
		NProgress.done();
	}, [pathname]);

	type clickHandlerType = {
		title: string;
		e: React.MouseEvent<HTMLElement>;
	};

	const navigationHandler = ({ title: projectName, e }: clickHandlerType) => {
		let isView;
		if (e.target instanceof Element)
			isView = e.target.className.includes('view');

		if (!isDragged || isView) {
			NProgress.start();
			router.push(`/project?name=${projectName.toLocaleLowerCase()}`);
		}

		setIsDragged(false);
	};

	const handleDragStart = () => {
		const ulElement = ulRef.current;

		if (ulElement) {
			ulElement.style.cursor = 'grab';
		}

		setIsDragged(true);
	};

	const handleDragEnd = () => {
		const ulElement = ulRef.current;
		if (ulElement) {
			ulElement.style.cursor = 'pointer';
		}
	};

	return (
		<motion.div
			className="work-content bg-p1ink-25 dark:bg-dark-100 mt-10 rounded-md"
			drag="x"
			// dragPropagation
			dragConstraints={{
				left:
					windowWidth < 992
						? -((ulRef?.current?.clientWidth || 0) - windowWidth / 2)
						: -windowWidth - windowWidth / 3,
				right:
					windowWidth < 992 ? windowWidth / 2 : windowWidth - windowWidth / 3,
			}}
			dragElastic={0.1}
			// initial={{ x: windowWidth < 992 ? windowWidth / 2 : 400 }}
			initial={{
				x:
					typeof window !== 'undefined'
						? window.innerWidth < 992
							? window.innerWidth / 2
							: 400
						: 200,
			}}
			dragControls={dragControls}
			// dragListener={false}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="work-content__list-wrapper">
				<ul
					ref={ulRef}
					className="work-content__list  flex gap-4 md:gap-5"
					// onPointerDown={(e) => dragControls.start(e)}
					// onClick={navigationHandler}
				>
					{projects.map(({ title, subTitle, img }) => (
						<ListItem
							key={title}
							title={title}
							subTitle={subTitle}
							img={img}
							theme={theme || 'dark'}
							pointerDown={(e) => dragControls.start(e)}
							clickHandler={({ title, e }) => navigationHandler({ title, e })}
						/>
					))}
				</ul>
			</div>
		</motion.div>
	);
}

interface listItemProps {
	key: string;
	title: string;
	subTitle: string;
	img: string;
	theme: string;

	pointerDown: (e: React.PointerEvent<HTMLElement>) => void;
	clickHandler: ({
		title,
		e,
	}: {
		title: string;
		e: React.MouseEvent<HTMLElement>;
	}) => void;
}
const ListItem = ({
	title,
	subTitle,
	img,
	theme,
	pointerDown,
	clickHandler,
}: listItemProps) => {
	return (
		<li
			className="work-content__item w-full md:w-1/2 lg:w-1/4 h-[350px] md:h-[470px]"
			onPointerDown={(e) => pointerDown(e)}
			onClick={(e) => clickHandler({ title, e })}
		>
			<div className="work-content__details-wrapper">
				<div className="work-content__main-details">
					<Image
						src={img}
						alt={`${title}-image`}
						priority={true}
						fill
						// objectFit="cover"
						style={{ objectFit: 'cover' }}
						sizes="(max-width: 768px) 75vw, (max-width: 768px) 65vw, 25vw"
						className="work-content__img"
					/>
					<div className={`work-content__details ${theme}`}>
						<div className="text-center overflow-hidden h-[110px] bg-pink-5f0">
							<h3 className="text-3xl md:text-5xl font-nunito font-extrabold uppercase">
								{title}
							</h3>
							<span className="text-sm md:text-base">{subTitle}</span>
							<span className="block md:hidden text-center mt-3">
								<button className="view-btn rounded-sm text-base px-5 pt-0.5 pb-1 bg-pink-400 dark:bg-pink-100">
									View
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

const projects = [
	{
		title: 'Philex',
		subTitle: 'Web App - 2022',
		img: '/assets/philex.png',
	},
	{
		title: 'ComePers',
		subTitle: 'Web App - 2023',
		img: '/assets/comepers.png',
	},
	{
		title: 'ProDev',
		subTitle: 'Web App - 2023',
		img: '/assets/prodev.png',
	},
	{
		title: 'rmtDev',
		subTitle: 'Web App - 2023',
		img: '/assets/rmtdev.png',
	},
	{
		title: 'CorpCmt',
		subTitle: 'Web App - 2023',
		img: '/assets/corpcomment.png',
	},
	{
		title: 'BtrPhotos',
		subTitle: 'UI/UX Design - 2023',
		img: '/assets/betterphotos.png',
	},
	{
		title: 'SclEditor',
		subTitle: 'UI/UX Design - 2023',
		img: '/assets/socialeditor.png',
	},
];

export default WorkContent;
