import React from 'react';
import Image from 'next/image';

import '../../dist/project.css';

interface propsType {
	previews?: {
		name: string;
		title: string;
		description: string;
		image: string;
	}[];
}

function Previews({ previews }: propsType) {
	return (
		<section className="w-full md:w-3/4 m-auto my-5 px-5 md:px-0 overflow-hidden dark:bg-dark-100">
			<h2 className="text-left text-lg md:text-xl font-nunito font-semibold uppercase pb-5 text-pink-100 dark:text-white">
				Project Previews
			</h2>
			<div className={`preview w-full _${previews?.length}-items`}>
				<ul
					className="preview-list text-center"
					style={{ width: `${(previews?.length || 0) * 200}%` }}
				>
					{previews?.map((item, i) => (
						<li
							style={{ width: `${100}%` }}
							key={item.name}
							className={`inline-block px-6 py-1 text-lg relative`}
						>
							<Image
								src={item.image}
								alt={item.name}
								priority={false}
								// fill
								// placeholder="blur"
								quality={100}
								width={1897}
								height={931} // Adjust the height as needed
								// objectFit="contain" // or "contain" depending on your preference
							/>
						</li>
					))}

					{previews?.map((item, i) => (
						<li
							style={{ width: `${100}%` }}
							key={item.name}
							className={`inline-block px-6 py-1 text-lg relative`}
						>
							<Image
								src={item.image}
								alt={item.name}
								priority={false}
								// fill
								// placeholder="blur"
								quality={100}
								width={1897}
								height={931} // Adjust the height as needed
								// objectFit="contain" // or "contain" depending on your preference
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default Previews;
