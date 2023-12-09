import React from 'react';

import MyProject from '@/components/Project';

// data
import constants from '@/constants';

export async function getServerSideProps(ctx: any) {
	const { params } = ctx;

	return {
		props: {
			params,
		},
	};
}

function Project({
	searchParams,
}: {
	searchParams?: { [key: string]: string };
}) {
	const name: string | undefined = searchParams?.name;

	const data = name ? constants[name as keyof typeof constants] || {} : {};

	return <MyProject data={data} />;
}

export default Project;
