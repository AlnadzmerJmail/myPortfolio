'use client';
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import {
	useForm,
	SubmitHandler,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form';

import { useTheme } from 'next-themes';

import '../dist/contact.css';

function Contact() {
	const sent = 'Your message has been sent. Thank you!';
	const error = 'Something went wrong while sending your message.';
	const inputRef = useRef<HTMLInputElement | null>(null);
	// theme
	const { theme } = useTheme();

	const [message, setMessage] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			if (message === sent || message === error) setMessage('');
		}, 3000);

		return () => clearTimeout(timer);
	}, [message]);

	// form
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async ({ name, email, message }) => {
		try {
			setMessage('sending');
			const emailResponse = await fetch('/api/mail', {
				method: 'POST',
				body: JSON.stringify({
					name,
					email,
					message,
				}),
			});

			const data = await emailResponse.json();

			if (data.success) setMessage(sent);
		} catch (er) {
			setMessage(error);
		} finally {
			reset();
		}
	};

	return (
		<section
			id="contact"
			className="w-full pt-12 pb-0 px-5 md:px-[200px] m-auto flex flex-wrap justify-center items-center bg-white dark:bg-dark-100"
		>
			<div className="w-full md:w-1/2 pr-10">
				<span className="block text-left text-lg font-nunito font-bold uppercase mb-5 text-pink-500 dark:text-purple-800 red-700">
					Contact
				</span>
				<h3 className="text-2xl md:text-4xl font-roboto font-bold mb-5 text-red-400 dark:text-pink-50">
					Need a passionate developer?
				</h3>
				<p className="w-full text-lg md:text-xl font-nunito mb-8 md:mb-10 text-pink-400 dark:text-pink-100">
					Let me join your team, we'll together create impactful and innovative
					solutions that reflect our shared commitment.
				</p>

				{/* Contact Details */}
				<ContactIcon
					icon={
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
						/>
					}
					text="+63 991-104-1711"
				/>
				<ContactIcon
					icon={
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
						/>
					}
					text="alnadzmerjamil@gmail.com"
				/>
				<ContactIcon
					icon={
						<>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
							/>
						</>
					}
					text="Pasig City, Philippines"
				/>
			</div>

			{/* Email Form */}
			<div className="w-full md:w-1/2 mt-5 md:mt-0">
				<form onSubmit={handleSubmit(onSubmit)}>
					<EmailInput
						inputClassName={theme}
						label="Name"
						errors={errors}
						register={register}
						type="name"
					/>
					<EmailInput
						inputClassName={theme}
						label="Email"
						errors={errors}
						register={register}
						type="email"
					/>
					<EmailInput
						mainClassName="mb-8"
						inputClassName={theme}
						label="Message"
						errors={errors}
						register={register}
						type="message"
					/>
					{/* Notify Button */}
					<div
						className={`${
							message && message !== 'sending' ? 'visible' : 'invisible'
						} font-semibold text-left text-pink-500 dark:text-purple-700 mb-2 flex`}
					>
						<span className="pr-2">{message}</span>
						<span>
							{message.includes('sent') ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-thumb-up"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-mood-sad"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
									<path d="M9 10l.01 0" />
									<path d="M15 10l.01 0" />
									<path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
								</svg>
							)}
						</span>
					</div>
					<label
						htmlFor="submit"
						className={`flex flex-wrap justify-center items-center cursor-pointer notify-btn-${
							theme || 'dark'
						} ${message === 'sending' ? 'notify-btn--sending' : ''}`}
					>
						<input
							disabled={message === 'sending'}
							ref={inputRef}
							id="submit"
							type="submit"
							value="Notify me"
							className="text-base md:text-lg font-roboto font-semibold cursor-pointer"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 ml-3"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
							/>
						</svg>
					</label>
				</form>
			</div>
		</section>
	);
}

// FOR FORM------------------------------------------------------------------------------------------------------------------

type Inputs = {
	name: string;
	email: string;
	message: string;
};

// EMAIL ERROR ICON------------------------------------------------------------------------------------------------------------------
const ErrorNotification = ({ label }: { label: string }) => {
	return (
		<span className="block mt-2 font-nunito text-sm text-red-100 dark:text-rose-700">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6 inline pr-1 pb-1"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
				/>
			</svg>
			{label} is required
		</span>
	);
};

// CONTACT DETAILS------------------------------------------------------------------------------------------------------------------
interface iconProps {
	icon: ReactNode;
	className?: string;
	text: string;
}

const ContactIcon = ({ icon, className, text }: iconProps) => {
	return (
		<div className="flex text-[15px] md:text-base font-nunito  flex-wrap mb-2 text-indigo-400 dark:text-pink-50">
			<span className="text-base align-top">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-4 h-4 md:w-5 md:h-5 align-middle inline-block"
				>
					{icon}
				</svg>
			</span>
			<span className="pl-2">{text}</span>
		</div>
	);
};

// EMAIL INPUT------------------------------------------------------------------------------------------------------------------

interface emailInputProps {
	mainClassName?: string;
	inputClassName?: string;
	register: UseFormRegister<Inputs>;
	type: 'name' | 'email' | 'message';
	label: string;
	errors: any;
}

const EmailInput = ({
	mainClassName,
	inputClassName,
	label,
	errors,
	register,
	type,
	...rest
}: emailInputProps) => {
	return (
		<div className={`mb-3 ${mainClassName}`}>
			<label
				htmlFor={label.toLocaleLowerCase()}
				className="mb-3 block text-pink-500 font-nunito font-semibold dark:text-pink-100"
			>
				{label}
			</label>
			{label.toLocaleLowerCase() === 'message' ? (
				<textarea
					id={label.toLocaleLowerCase()}
					placeholder={`Enter ${label.toLocaleLowerCase()}`}
					className={`w-full block font-nunito pl-3 py-3 ipt-${
						inputClassName || 'dark'
					}`}
					rows={3}
					{...register(type, { required: true })}
				/>
			) : (
				<input
					id={label.toLocaleLowerCase()}
					placeholder={`Enter ${label.toLocaleLowerCase()}`}
					className={`w-full block font-nunito pl-3 py-3 ipt-${
						inputClassName || 'dark'
					}`}
					{...register(type, { required: true })}
				/>
			)}
			{errors?.name && <ErrorNotification label={label} />}
		</div>
	);
};

export default Contact;
