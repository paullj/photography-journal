import { useState } from 'react'
import { useRouter } from 'next/router'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useForm } from "react-hook-form";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import Head from 'next/head'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import Avatar from '@/components/shared/Avatar'
import Centered from '@/layouts/Centered';

import type { NextPageWithLayout } from './_app'
import TextInput from '@/components/shared/Input';

interface WelcomeProps { }

interface WelcomeFormInput {
	name: string;
	username: string;
};


export const getServerSideProps = withPageAuth({
	authRequired: true,
	getServerSideProps: async (_, supabase) => {
		const { data: { user } } = await supabase.auth.getUser();
		const { data: userProfile, error } = await supabase
			.from("users")
			.select("name")
			.eq("id", user?.id)
			.single();

		if (userProfile?.name) {
			return {
				redirect: {
					destination: "/",
					permanent: false
				}
			}
		}
		return {
			props: {}
		}
	}
});


const WelcomePage: NextPageWithLayout<WelcomeProps> = (props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit } = useForm<WelcomeFormInput>();
	const supabase = useSupabaseClient();
	const session = useSession();

	const handleSubmitForm = handleSubmit(async (values) => {
		if (!loading) {
			setLoading(true);
			const response = await supabase.from("users").update({
				name: values.name,
				username: values.username
			}).eq("id", session?.user.id);

			if (response.status >= 200 && response.status < 300) {
				setLoading(false);
				router.push('/')
			} else {
				console.log(response.status)
				console.log(response.error)
				console.log(response.statusText)
			}
		}
	});

	return (
		<>
			<Head>
				<title>/</title>
			</Head>
			<div className='mt-8'>
				<div className='mb-8'>
					<Avatar></Avatar>
				</div>
				<div className='mb-8'>
					<h1 className='mb-1 text-xl font-semibold'>Welcome</h1>
					<p>Enter your username and full name for your public profile.</p>
				</div>
				<div>
					<form onSubmit={handleSubmitForm} className="w-full">
						<div className='flex items-center space-x-0.5 px-1 border-4 rounded-md'>
							<span className="inline">@</span>
							<div className="w-full grow">
								<TextInput label='username' id='username' placeholder='username' {...register("username", { required: true, maxLength: 32 })} />
							</div>
						</div>
						<div className='flex items-center px-1 mt-2 border-4 rounded-md'>
							<Input label='name' id='name' placeholder='Full Name' {...register("name", { required: true })} />
						</div>
						<Button type="submit" className='flex justify-center w-full mt-8' disabled={loading}>
							<div className=''></div>
							Next
						</Button>
					</form>
				</div>

			</div>
		</>
	)
}

WelcomePage.getLayout = (page) => {
	return (
		<Centered>
			{page}
		</Centered>
	)
}

export default WelcomePage;
