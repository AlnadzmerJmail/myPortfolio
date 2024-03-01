'use client';
import { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';
import { get } from 'http';

const myName = 'Alnadzmer Jamil';

function MyName() {
	// theme
	const { theme } = useTheme();

	const [name, setName] = useState<string>('');

	const [start, setStart] = useState(false);

	useEffect(() => {
		const getTop = () => {
			let top = window.scrollY;
			const deviceHeight = window.innerHeight;

			// 80 -- is nav height but we gave here 200 -- because 200 away to the top the name will be showm
			let base = deviceHeight - 200;

			if (top > base) setStart(true);

			// approximate estimate
			if (top / 2 - 100 >= deviceHeight || top === 0) {
				setName('');
				setStart(false);
			}
		};

		getTop();

		const handleScroll = (e: any) => {
			getTop();
		};
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		let flg = false;
		const timer = setInterval(() => {
			if (!start) return;

			setName((prev) => {
				if (!prev) {
					return myName.charAt(0);
				}

				if (prev.length === myName.length) {
					clearInterval(timer);
				}

				// // 2nd to last letter
				return `${prev}${myName.charAt(prev.length)}`;
			});
		}, 200);

		return () => clearInterval(timer);
	}, [start]);

	return (
		<h3
			className={`w-full relative text-3xl md:text-6xl font-nunito font-black pb-1 md:pb-0 my-name ${
				theme || 'dark'
			}-my-name ${name.length === myName.length ? 'blink' : ''}`}
		>
			{name}
		</h3>
	);
}

export default MyName;
