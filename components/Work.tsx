'use client';
import React from 'react';

import WorkContent from './WorkContent';

function Work() {
	return (
		<div id="work" className="w-ful overflow-hidden bg-white dark:bg-dark-100">
			<div className="w-full pl-5 md:pl-0  md:text-left md:w-3/4 md:relative md:left-[400px]  bg-white dark:bg-dark-100">
				<span className="text-lg font-nunito font-bold text-left uppercase text-pink-500 dark:text-purple-800 red-700">
					Work
				</span>
				<span className="px-2 text-lg font-extrabold text-dark-50 dark:text-pink-50">
					|
				</span>
				<span className="text-lg font-nunito font-bold text-left uppercase text-pink-500 dark:text-purple-800 red-700">
					Project I work on
				</span>
			</div>
			<WorkContent />
		</div>
	);
}

export default Work;
