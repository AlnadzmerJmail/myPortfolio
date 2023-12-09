'use client';
import Link, { LinkProps } from 'next/link';
import React, { PropsWithChildren } from 'react';
// mirror the props of next/link component
type AnchorProps = Omit<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof LinkProps
>;

type ScrollLinkProps = AnchorProps & LinkProps & PropsWithChildren;

const ScrollLink = ({ children, ...props }: ScrollLinkProps) => {
	const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (props.id === 'nothing' || props.target) return;

		e.preventDefault();
		//remove everything before the hash
		const targetId = e.currentTarget.href.replace(/.*\#/, '');
		const targetElement = document.getElementById(targetId);
		targetElement?.scrollIntoView({
			behavior: 'smooth',
		});
	};
	return (
		<Link {...props} onClick={handleScroll}>
			{children}
		</Link>
	);
};
export default ScrollLink;
