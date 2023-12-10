import React from 'react';

import MyProject from '@/components/Project';

// data
import constants from '@/constants';

type Props = {
	params: {};
	searchParams: { [key: string]: string | string[] | undefined };
};

function Project(props: Props) {
	const searchParams = props.searchParams;
	const name: string | string[] | undefined = searchParams?.name;
	const data = name ? constants[name as keyof typeof constants] || {} : {};

	return <MyProject data={data} />;
}

export default Project;
