'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Me() {
	const { theme } = useTheme();

	const [updatedTheme, setUpdatedTheme] = useState('');

	useEffect(() => {
		if (theme) setUpdatedTheme(theme === 'dark' ? 'opacity-70' : 'opacity-95');
	}, [theme]);
	return (
		<div className="w-full md:w-1/2">
			<Image
				src={'/assets/me.jpg'}
				alt="Alnadzmer Photo"
				className={updatedTheme}
				width={1000}
				height={100}
			/>
		</div>
	);
}
