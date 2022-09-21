import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useForm } from "react-hook-form";

import Link from 'next/link'
import Head from 'next/head'
import TextInput from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import Centered from '@/layouts/Centered';

import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import { ResetIcon } from '@radix-ui/react-icons'

export const getServerSideProps = withPageAuth({
	authRequired: false,
	getServerSideProps: async (_, supabase) => {
		const { data: { user } } = await supabase.auth.getUser();

		if (user) {
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

interface LoginFormValues {
	email: string;
}

const LoginPage: NextPageWithLayout = () => {
	const [loading, setLoading] = useState(false)
	const supabaseClient = useSupabaseClient();

	const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

	const handleLogin = handleSubmit(async (values) => {
		try {
			setLoading(true);
			const { error } = await supabaseClient.auth.signInWithOtp({
				email: values.email,
				options: {
					emailRedirectTo: "http://localhost:3000/welcome"
				}
			})
			if (error) {
				throw error
			}
		} catch (error: any) {
			alert(error.error_description || error.message)
		} finally {
			setLoading(false);
		}
	});

	return (
		<>
			<Head>
				<title>Log In</title>
			</Head>
			<div className='mt-8'>
				<div className='mb-8'>
					<h1 className='mb-1 text-xl font-semibold'>Log in.</h1>
					<p>This sends a <i>magic</i> link to your email that you can use to sign in.</p>
				</div>
				<form className="flex w-full space-x-2" onSubmit={handleLogin}>
					<div className='px-1 border-4 rounded-md grow'>
						<TextInput
							type="email"
							className='bg-transparent'
							placeholder="user@example.com"
							label='email' id='email'
							{...register("email", { required: true })} />
					</div>

					<Button disabled={loading} type="submit">
						<span>{loading ? 'Sending...' : 'Send magic link'}</span>
					</Button>
				</form>
			</div>
		</>
	)
}

LoginPage.getLayout = (page: ReactElement) => {
	return (
		<Centered>
			<Link href="/">
				<a>
					<Button>
						<ResetIcon></ResetIcon>
					</Button>
				</a>
			</Link>

			{page}
		</Centered>
	)
}

export default LoginPage;