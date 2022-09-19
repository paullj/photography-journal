import '../styles/globals.css';

import { useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement, props: P) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	const getLayout = Component.getLayout ?? ((page) => page)
	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}>
			{/* initialSession={pageProps.initialSession} */}

			{getLayout(<Component {...pageProps} />, pageProps)}
		</SessionContextProvider>
	)
}

export default App
