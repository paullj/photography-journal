import Head from 'next/head'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import Feed from '@/components/Feed'
import { getUser } from 'pages/api/users/[username]'

import type { NextPageWithLayout } from '../_app'
import type { PostData } from '@/models/post'
import type { UserData } from '@/models/user'
import UserCard from '@/components/UserCard'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'

interface UserProps extends UserData {
	username: string;
	posts: PostData[]
}

export const getServerSideProps = withPageAuth({
	authRequired: false,
	getServerSideProps: async (context, supabase) => {
		const handle = context.params?.handle as string;
		const [_, username] = handle.split('@') ?? [];

		if (username) {
			const { status, user } = await getUser(supabase, username);

			if (status === 200 && user) {
				return {
					props: {
						...user
					}
				}
			}
		}

		return {
			notFound: true
		}
	}
});


const UserPage: NextPageWithLayout<UserProps> = ({ name, username, posts }) => {
	return (
		<>
			<Head>
				<title>
					User page
				</title>
			</Head>
			<Feed posts={posts}></Feed>
		</>
	)
}


UserPage.getLayout = (page, props) => {
	return (
		<LayoutWithSidebar>
			<LayoutWithSidebar.Sidebar>
				<UserCard {...props}></UserCard>
			</LayoutWithSidebar.Sidebar>
			<LayoutWithSidebar.Body>
				{page}
			</LayoutWithSidebar.Body>
		</LayoutWithSidebar>
	)
}

export default UserPage;
