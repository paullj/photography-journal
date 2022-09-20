import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import { UserWithPosts } from "@/models/user";
import type { NextApiHandler } from "next";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/database";
import { placeholderImageUrl } from "@/providers/cloudinary";

const selectQuery = `
		id,
		username,
		name,
		posts(
			id,
			title,
			createdAt:created_at,
			updatedAt:updated_at,
			author:author_id(
				id,
				username
			),
			images!inner(
				id,
				width,
				height,
				altText:alt_text,
				url:image_url
			)
		)
	`;

const getUser = async (
	supabaseClient: SupabaseClient<Database>,
	username: string
) => {
	const query = supabaseClient
		.from("users")
		.select(selectQuery)
		.eq("username", username)
		.order("created_at", {
			foreignTable: "posts",
			ascending: false,
		})
		.single();

	const { status, statusText, data } = await query;

	let user = data as UserWithPosts;
	user = {
		...user,
		posts: user.posts.map((post) => ({
			...post,
			images: post.images!.map((image) => ({
				...image,
				placeholderUrl: placeholderImageUrl(image.url),
			})),
		})),
	};

	return {
		status,
		statusText,
		user,
	};
};

const handler: NextApiHandler = withApiAuth(
	async (request, response, supabaseClient) => {
		const { username } = request.query;

		const { status, statusText, user } = await getUser(
			supabaseClient,
			username as string
		);

		if (status === 200 && user) {
			response.status(200).json({
				user,
			});
		} else {
			response
				.status(status || 500)
				.end(statusText || "Internal server error!");
		}
	}
);

export default handler;
export { getUser };
