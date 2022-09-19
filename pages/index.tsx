import Head from 'next/head'
import LayoutWithHeader from '@/layouts/LayoutWithHeader'
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import type { NextPageWithLayout } from './_app'
import type { PostData } from '@/models/post'

import { getPosts } from './api/posts'
import Feed from '@/components/Feed'
interface HomeProps {
	posts: PostData[]
}

export const getServerSideProps = withPageAuth({
	authRequired: false,
	getServerSideProps: async (_, supabase) => {
		const { status, posts } = await getPosts(supabase);

		if (status === 200 && posts) {
			return {
				props: {
					posts,
				}
			}
		} else {
			return {
				notFound: true
			}
		}
	}
});

const Home: NextPageWithLayout<HomeProps> = ({ posts }) => {
	return (
		<>
			<Head>
				<title>/</title>
			</Head>
			<Feed posts={posts}></Feed>
		</>
	)
}

Home.getLayout = (page) => {
	return (
		<LayoutWithHeader>
			{page}
		</LayoutWithHeader>
	)
}

export default Home;
