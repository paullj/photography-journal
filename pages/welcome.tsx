import { useState } from 'react'
import { useRouter } from 'next/router'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useForm } from "react-hook-form";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import Head from 'next/head'
import Layout from '@/layouts/DefaultLayout'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import Avatar from '@/components/shared/Avatar'

import type { NextPageWithLayout } from './_app'

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
			<div className='items-center justify-center h-full sm:flex'>
				<div className='sm:w-2/3 md:max-w-md'>
					<Avatar></Avatar>
					<form onSubmit={handleSubmitForm}>
						<div className='flex items-center space-x-0.5'>
							<span className="inline">@</span>
							<div className="w-full grow">
								<Input label='username' id='username' placeholder='username' {...register("username", { required: true, maxLength: 32 })} />
							</div>
						</div>
						<Input label='name' id='name' placeholder='Full Name' {...register("name", { required: true })} />
						<Button type="submit" className='flex justify-center w-full mt-4' disabled={loading}>
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
		<Layout>
			{page}
		</Layout>
	)
}

export default WelcomePage;
