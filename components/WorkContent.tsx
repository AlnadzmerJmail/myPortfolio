'use client';
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import Image from 'next/image';

import { useRouter, usePathname } from 'next/navigation';
import * as NProgress from 'nprogress';

import {
	motion,
	useDragControls,
	useAnimationControls,
	useMotionValue,
} from 'framer-motion';
import { useTheme } from 'next-themes';
import '../dist/work.css';

function WorkContent() {
	const router = useRouter();
	const pathname = usePathname();

	// theme
	const { theme } = useTheme();

	const draggableRef = useRef<HTMLDivElement | null>(null);
	const ulRef = useRef<HTMLUListElement | null>(null);

	const dragControls = useDragControls();
	const animationControls = useAnimationControls();

	const x = useMotionValue(0);

	const [windowWidth, setWindowWidth] = useState(0);
	const [isDragged, setIsDragged] = useState(false);

	const [isPrevBtnDisabled, setIsPrevBtnDisabled] = useState(false);
	const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);
	const [barWidth, setBarWidth] = useState(0);

	const maxLeft =
		windowWidth < 992
			? -((ulRef?.current?.clientWidth || 0) - windowWidth / 2)
			: -(ulRef?.current?.clientWidth || 0) + windowWidth - 400;
	const maxRight = windowWidth < 992 ? windowWidth / 2 : 400;

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

		const mouseOverEventListener = () => {
			if (ulElement) {
				ulElement.style.cursor = 'pointer';
			}

			if (draggableRef?.current) {
				draggableRef.current.style.transition = '';
			}
		};

		const mouseOutEventListener = () => {
			if (ulElement) ulElement.style.cursor = 'auto';
		};

		if (ulElement) {
			ulElement.addEventListener('mouseover', mouseOverEventListener);

			ulElement.addEventListener('mouseout', mouseOutEventListener);
		}

		return () => {
			removeEventListener('mouseover', mouseOverEventListener);
			removeEventListener('mouseout', mouseOutEventListener);
		};
	}, [ulRef, windowWidth, draggableRef]);

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

		if (ulElement) ulElement.style.cursor = 'grab';

		setIsDragged(true);
	};

	const handleDragEnd = () => {
		const ulElement = ulRef.current;
		if (ulElement) ulElement.style.cursor = 'pointer';
	};

	const getDraggableTransformXValue = (): {
		transformValues: string[];
		transformXValue: string;
	} => {
		const currentTransform =
			draggableRef?.current?.style?.transform?.split(' ') || [];

		let transformXValue = '';

		if (currentTransform[0]) {
			const transformX = currentTransform[0];

			// get the number -- translateX(200px)
			transformXValue = transformX.substring(11, transformX.length - 3);
		}

		return { transformValues: currentTransform, transformXValue };
	};

	const prevNextHandler = (e: React.MouseEvent<HTMLElement>) => {
		const { transformValues, transformXValue } = getDraggableTransformXValue();

		const clickedEL = e.currentTarget;

		const isNext = clickedEL.className.includes('--next');

		const value = Number(transformXValue);

		if (!isNaN(value)) {
			// every click we add or minus 320px
			let newValue = isNext ? value + 320 : value - 320;

			// max scroll to right
			if (isNext) {
				if (newValue > maxRight || newValue === maxRight) {
					newValue = maxRight;
					setIsNextBtnDisabled(true);
				}
			} else {
				if (newValue < maxLeft || newValue === maxLeft) {
					newValue = maxLeft;
					setIsPrevBtnDisabled(true);
				}
			}

			transformValues[0] = `translateX(${newValue}px)`;
			animationControls.set({
				x: newValue,
				y: 0,
			});
		}

		if (draggableRef?.current?.style?.transform) {
			draggableRef.current.style.transform = transformValues.join(' ');
			draggableRef.current.style.transition = 'all ease 0.5s 0.1s';
		}

		handleDrag();
	};

	const handleDrag = () => {
		// `info.point.x` contains the x-axis position while dragging
		// x.set(info.point.x);

		const { transformValues, transformXValue } = getDraggableTransformXValue();

		// when value is maxRight(400) or greater it means the bar should be 0

		// when value is maxLeft(-1234 -- dynamic) or less it means the bar should be full
		const value = Number(transformXValue);

		// so it starts from 400 until it reaches the maxLeft(negative numbers -- so 400 downward)

		// 400 -- is offset so that it will be the same as contact width
		const barMaxWidth = windowWidth - 400;

		// convert value and maxLeft to positive number
		let positiveValue = Math.abs(value);
		const positiveMaxLeft = Math.abs(maxLeft);

		let maxLeftCopy = positiveMaxLeft;

		// not yet reached the left side
		if (value > 0) {
			positiveValue = 400 - positiveValue;
		} else {
			positiveValue += 400;
			maxLeftCopy += 400;
		}

		const percent = Math.round((positiveValue / maxLeftCopy) * 100);

		setBarWidth(percent > 100 ? 100 : percent < 0 ? 0 : percent);

		// max scroll to left
		if (value < maxLeft || value === maxLeft) {
			setIsPrevBtnDisabled(true);
		} else setIsPrevBtnDisabled(false);

		// max scroll to right
		if (value > maxRight || value === maxRight) {
			setIsNextBtnDisabled(true);
		} else setIsNextBtnDisabled(false);
	};

	return (
		<>
			<motion.div
				animate={animationControls}
				ref={draggableRef}
				className="work-content bg-p1ink-25 dark:bg-dark-100 mt-10 rounded-md"
				drag="x"
				// dragPropagation
				dragConstraints={{
					left: maxLeft,
					right: maxRight,
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
				onDrag={handleDrag}
			>
				<div className="work-content__list-wrapper">
					<ul
						ref={ulRef}
						className="work-content__list flex gap-4 md:gap-6"
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

			{/* Navigation buttons */}
			<button
				disabled={isPrevBtnDisabled}
				className={`${
					theme || 'dark'
				} bg-pink-25 dark:bg-dark-100 work-content__button--prev navigation-btn`}
				onClick={prevNextHandler}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="arrow-left navigation-arrow"
				>
					<path
						fillRule="evenodd"
						d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>

			<button
				disabled={isNextBtnDisabled}
				className={`${
					theme || 'dark'
				} bg-pink-25 dark:bg-dark-100 work-content__button--next navigation-btn`}
				onClick={prevNextHandler}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="arrow-right navigation-arrow"
				>
					<path
						fillRule="evenodd"
						d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>

			{/* bar */}
			<div className={`${theme || 'dark'} work-bar`}>
				<p style={{ width: `${barWidth}%` }} />
			</div>
		</>
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
			// className="work-content__item w-full md:w-1/2 lg:w-1/4 h-[350px] md:h-[470px]"
			className="work-content__item w-full md:w-1/2 lg:w-[22%] h-[350px] md:h-[450px] overflow-hiddenn"
			onPointerDown={(e) => pointerDown(e)}
			onClick={(e) => clickHandler({ title, e })}
		>
			<div className={`${theme || 'dark'} work-content__details-wrapper`}>
				<div className="work-content__main-details">
					<Image
						src={img}
						alt={`${title}-image`}
						priority={true}
						fill
						// objectFit="cover"
						style={{ objectFit: 'cover' }}
						sizes="(max-width: 768px) 75vw, (max-width: 768px) 65vw, 25vw"
						className="work-content__img rounded-md"
					/>
					<div className={`work-content__details ${theme}`}>
						<div className="text-center overflow-hidden h-[110px] bg-pink-5f0">
							<h3 className="text-3xl md:text-4xl font-nunito font-extrabold uppercase">
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
		img: '/assets/philex-thumbnail.jpg',
	},
	{
		title: 'ComePers',
		subTitle: 'Web App - 2023',
		img: '/assets/comepers-thumbnail.jpg',
	},
	{
		title: 'ProDev',
		subTitle: 'Web App - 2023',
		img: '/assets/prodev-thumbnail.jpg',
	},
	{
		title: 'rmtDev',
		subTitle: 'Web App - 2023',
		img: '/assets/rmtdev-thumbnail.jpg',
	},
	{
		title: 'CorpCmt',
		subTitle: 'Web App - 2023',
		img: '/assets/corp-comment-thumbnail.jpg',
	},
	{
		title: 'BtrPhotos',
		subTitle: 'UI/UX Design - 2023',
		img: '/assets/better-photos-thumbnail.jpg',
	},
	{
		title: 'SclEditor',
		subTitle: 'UI/UX Design - 2023',
		img: '/assets/social-editor-thumbnail.jpg',
	},
];

export default WorkContent;
