import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { getPost } from 'pages/api/posts/[id]';

import Head from 'next/head'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar';
import PostImage from '@/components/Post';
import UserCard from '@/components/UserCard';
import PostInfo from '@/components/PostInfo';
import { LightboxContext, LightboxContextProvider } from '@/context/LightboxContext';

import type { NextPageWithLayout } from '../_app'
import type { PostData } from '@/models/post'
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RealtimeChannel } from "@supabase/supabase-js";

interface PostProps extends PostData { }

export const getServerSideProps = withPageAuth({
	authRequired: false,
	getServerSideProps: async (context, supabase) => {
		const { id } = context.params!;
		const { status, post } = await getPost(supabase, id as string);

		if (status === 200 && post) {
			return {
				props: {
					...post,
				}
			}
		} else {
			return {
				notFound: true
			}
		}
	}
});

const PostPage: NextPageWithLayout<PostProps> = ({ id, status, title, images }) => {
	const supabase = useSupabaseClient();

	useEffect(() => {
		let channel: RealtimeChannel;

		// if (status === 'uploading') {
		channel = supabase
			.channel(`public:posts:id=eq.${id}`)
			.on('postgres_changes', {
				event: 'UPDATE',
				schema: 'public',
				table: 'posts',
				filter: `id=eq.${id}`
			}, (payload: any) => console.log(payload))
			.subscribe();
		// }

		return () => {
			// if (channel)
			// supabase.removeChannel(channel);
		}
	}, [id, status, supabase])

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			{status === 'done' ? (
				<div className=''>
					{images.filter((_, i) => i > 0).map((image, i) => (
						<LightboxContext.Consumer key={i}>
							{({ openModal }) => (
								<PostImage {...image} key={i} onClick={() => openModal(i + 1)} />
							)}
						</LightboxContext.Consumer>
					))}
				</div>
			) : (
				<div className="flex items-center justify-center bg-gray-300 rounded h-96 animate-pulse dark:bg-gray-700">
					<span>Processing...</span>
				</div>
			)}
		</>
	)
}

PostPage.getLayout = (page, { status, images, author, createdAt, title }) => {
	return (
		<LightboxContextProvider images={images}>
			<LayoutWithSidebar>
				{status === 'done' &&
					<LayoutWithSidebar.Header>
						<LightboxContext.Consumer>
							{({ openModal }) => (
								<PostImage {...images[0]} onClick={() => openModal(0)} />
							)}
						</LightboxContext.Consumer>
					</LayoutWithSidebar.Header>
				}
				<LayoutWithSidebar.Sidebar>
					<UserCard name={author.name} username={author.username}></UserCard>
					<PostInfo createdAt={createdAt} title={title} />
				</LayoutWithSidebar.Sidebar>
				<LayoutWithSidebar.Body>
					{page}
				</LayoutWithSidebar.Body>
			</LayoutWithSidebar>
		</LightboxContextProvider>
	)
}

export default PostPage;