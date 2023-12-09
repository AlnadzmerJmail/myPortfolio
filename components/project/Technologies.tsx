'use client';
import { motion } from 'framer-motion';

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.05 * index,
			duration: 0.4,
		},
	}),
};

interface propsType {
	stacks?: string[];
}

function Technologies({ stacks }: propsType) {
	return (
		<section className="w-full md:w-3/4 m-auto mt-5 px-5 md:px-0 ">
			<h2 className="text-left text-lg md:text-xl font-nunito font-semibold pb-5  uppercase text-pink-100 dark:text-white">
				Technologies
			</h2>
			<div className="py-5 md:py-10 bg-white dark:bg-dark-200">
				<ul className="w-full md:w-1/2 m-auto text-center">
					{stacks?.map((item, index) => (
						<motion.li
							key={index + item}
							variants={fadeInAnimationVariants}
							initial="initial"
							whileInView="animate"
							viewport={{
								once: true,
							}}
							custom={index}
							className="inline-block m-2 px-6 py-1 text-base font-semibold font-nunito rounded-full text-pink-50 dark:text-red-800 bg-pink-20 dark:bg-dark-50"
						>
							{item}
						</motion.li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default Technologies;
