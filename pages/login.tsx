import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'

import Link from 'next/link'
import Head from 'next/head'
import Layout from '@/layouts/DefaultLayout'
import TextInput from '@/components/shared/Input';
import Button from '@/components/shared/Button';

import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'

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

const LoginPage: NextPageWithLayout = () => {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('user@test.com')
	const supabaseClient = useSupabaseClient();

	const handleLogin = async (email: string) => {
		try {
			setLoading(true);
			const { error } = await supabaseClient.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: "/welcome"
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
	}

	return (
		<>
			<Head>
				<title>Sign In</title>
			</Head>
			<div>
				<form onSubmit={(event) => { event.preventDefault(); handleLogin(email) }}>
					<TextInput
						type="email"
						placeholder="user@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)} label='email' id='email' />
					<Button disabled={loading} type="submit">
						<span>{loading ? 'Loading' : 'Send magic link'}</span>
					</Button>
				</form>
			</div>
		</>
	)
}

LoginPage.getLayout = (page: ReactElement) => {
	return (
		<Layout>
			<Link href="/">Cancel</Link>
			{page}
		</Layout>
	)
}

export default LoginPage;