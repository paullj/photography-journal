import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { PostData } from "@/models/post";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { NextApiHandler } from "next";
import type { Database } from "@/database";
import { placeholderImageUrl } from "@/providers/cloudinary";

const selectQuery = `
		id,
		title,
		createdAt:created_at,
		updatedAt:updated_at,
		author:author_id(
			id,
			username,
			name
		),
		images!inner(
			id,
			width,
			height,
			altText:alt_text,
			url:image_url
		)
	`;

const getPostsQuery = async (supabaseClient: SupabaseClient<Database>) => {
	return await supabaseClient
		.from("posts")
		.select(selectQuery)
		.eq("upload_status", "done")
		.eq("images.post_order", 0)
		.order("created_at", {
			ascending: false,
		});
};

const getPosts = async (supabaseClient: SupabaseClient<Database>) => {
	const { status, error, statusText, data } = await getPostsQuery(
		supabaseClient
	);

	const posts = (data as PostData[]).map((post) => ({
		...post,
		images: post.images!.map((image) => ({
			...image,
			placeholderUrl: placeholderImageUrl(image.url),
		})),
	}));

	return { posts, status, statusText };
};

const handler: NextApiHandler = withApiAuth(
	async (_request, response, supabaseClient) => {
		const { status, statusText, posts } = await getPosts(supabaseClient);

		if (status === 200 && posts) {
			response.status(200).json({
				posts,
			});
		} else {
			response
				.status(status || 500)
				.end(statusText || "Internal server error!");
		}
	}
);

export default handler;
export { getPosts };
