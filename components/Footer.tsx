import React from 'react';

import FooterContent from './FooterContent';

import '../dist/footer.css';

function Footer() {
	const { GITHUB_URL, LINKEDIN_URL, FACEBOOK_URL } = process.env;
	const env = {
		GITHUB_URL,
		LINKEDIN_URL,
		FACEBOOK_URL,
	};

	return (
		<footer className="footer pt-20 pb-14 bg-pink-25 dark:bg-dark-200">
			<FooterContent env={env} />
		</footer>
	);
}

export default Footer;
