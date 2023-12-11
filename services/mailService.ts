const nodemailer = require('nodemailer');

interface sendMail {
	subject: String;
	toEmail: String;
	message: String;
}
export async function sendMail(sendMailObj: sendMail) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PW,
		},
	});

	const mailOptions = {
		from: process.env.NODEMAILER_EMAIL,
		to: sendMailObj.toEmail,
		subject: sendMailObj.subject,
		text: sendMailObj.message,
	};

	const info = await transporter.sendMail(mailOptions);

	if (info?.accepted[0]) return { success: true, ...info };

	return { success: false };
}
