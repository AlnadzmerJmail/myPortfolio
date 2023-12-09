import { sendMail } from '@/services/mailService';

export const POST = async (req: any, res: any) => {
	try {
		const { name, email, message } = await req.json();

		const subject = 'PORTFOLIO';
		const toEmail = email;

		const sendEmailResult = await sendMail({
			subject,
			toEmail,
			message: `${name}
		
		${message}
		`,
		});

		return new Response(JSON.stringify(sendEmailResult), { status: 200 });
	} catch (error) {
		return new Response('Failed on fetching prompts', { status: 500 });
	}
};
