import dynamic from 'next/dynamic';

import WorkContent from './WorkContent';

function Work({ theme }: { theme?: string }) {
	//  const DynamicContent = dynamic(() => import('./WorkContent'));
	return (
		<div
			id="work"
			className="w-full relative overflow-hidden bg-white dark:bg-dark-100 py-10"
		>
			<div
				className={`w-full pl-5 md:pl-0  md:text-left md:w-3/4 md:relative md:left-[400px]`}
			>
				<span
					className={`${
						theme || 'dark'
					} section-title text-lg font-nunito font-bold text-left uppercase text-pink-500 dark:text-purple-800 red-700`}
				>
					Work
				</span>
				<span className="px-2 text-lg font-extrabold text-dark-50 dark:text-pink-50">
					|
				</span>
				<span className="text-lg font-nunito font-bold text-left uppercase text-pink-500 dark:text-purple-800 red-700">
					Projects I have worked on
				</span>
			</div>
			<WorkContent />
		</div>
	);
}

export default Work;
