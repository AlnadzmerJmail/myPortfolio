import React from 'react';

import FooterContent from './FooterContent';

import '../dist/footer.css';

function Footer() {
	return (
		<footer className="footer pt-20 pb-14 bg-pink-25 dark:bg-dark-200">
			<FooterContent />
		</footer>
	);
}

export default Footer;
