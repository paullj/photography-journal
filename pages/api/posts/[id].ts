import { PostData } from "@/models/post";
import { withApiAuth } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { NextApiHandler } from "next";

const selectQuery = `
		id,
		title,
		status:upload_status,
		createdAt:created_at,
		updatedAt:updated_at,
		author:author_id(
			id,
			username,
			name
		),
		images(
			id,
			width,
			height,
			caption,
			altText:alt_text,
			order:post_order,
			altText:alt_text,
			url:image_url,
			model:camera_model,
			lensModel:lens_model,
			iso:iso_number,
			f:f_stop,
			exposureTime:exposure_time
		)
	`;

const getPost = async (supabaseClient: SupabaseClient, id: string) => {
	const { status, statusText, data } = await supabaseClient
		.from("posts")
		.select(selectQuery)
		.eq("id", id)
		.order("post_order", {
			foreignTable: "images",
		})
		.maybeSingle();

	return {
		status,
		statusText,
		post: data as PostData,
	};
};

const handler: NextApiHandler = withApiAuth(
	async (request, response, supabaseClient) => {
		const { id } = request.query;

		const { status, statusText, post } = await getPost(
			supabaseClient,
			id as string
		);

		if (status === 200 && post) {
			response.status(200).json({
				post,
			});
		} else {
			response
				.status(status || 500)
				.end(statusText || "Internal server error!");
		}
	}
);

export default handler;
export { getPost };
