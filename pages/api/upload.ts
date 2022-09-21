import formidable from "formidable";
import { uploader } from "@/providers/cloudinary";

import { withApiAuth } from "@supabase/auth-helpers-nextjs";

import type { ImageData, ImageMetadata } from "@/models/image";
import type { NextApiHandler } from "next";

export const config = {
	api: {
		bodyParser: false,
	},
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const handler: NextApiHandler = withApiAuth(
	async (request, response, supabase) => {
		if (request.method !== "POST") {
			response.status(405).end("File upload must be POST request");
		} else {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			const sessionId = user?.id;
			const userData = await supabase
				.from("users")
				.select("username")
				.match({ id: sessionId })
				.single();

			const form = formidable({
				multiples: true,
				maxFileSize: MAX_FILE_SIZE,
			});

			try {
				const postId = await new Promise((resolve, reject) => {
					form.parse(request, async (error, fields, files) => {
						if (error) {
							reject(error);
						}
						const zippedFiles = parseFilesAndFields(files, fields);

						const postResponse = await supabase
							.from("posts")
							.insert({
								author_id: sessionId,
								title: fields["title"] ?? "",
							})
							.select("id")
							.single();

						const imagePromises = zippedFiles.map(
							async ({ file, data, metadata, caption, altText }, i) => {
								return uploader
									.upload(file.filepath, {
										upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
										allowed_formats: [
											"gif",
											"png",
											"jpg",
											"heic",
											"heic",
											"tiff",
										],
									})
									.then((uploadResponse) => {
										console.log(uploadResponse);

										return supabase.from("images").insert({
											owner_id: sessionId,
											post_id: postResponse.data!.id,
											post_order: i,
											image_url: uploadResponse.secure_url,
											width: data.width,
											height: data.height,
											caption,
											alt_text: altText,
											camera_model: metadata.model,
											lens_model: metadata.lensModel,
											iso_number: metadata.iso,
											f_stop: metadata.f,
											exposure_time: metadata.exposureTime,
										});
									});
							}
						);

						Promise.all(imagePromises)
							.then((response) => {
								console.log(response);

								return supabase
									.from("posts")
									.update({
										upload_status: "done",
									})
									.eq("id", postResponse.data!.id);
							})
							.catch((error) => {
								console.log(error);

								supabase
									.from("posts")
									.update({
										upload_status: "error",
									})
									.eq("id", postResponse.data!.id);
							});
						resolve(postResponse?.data?.id);
					});
				}).catch((error) => {
					response.status(error.httpCode || 400).end(String(error));
				});

				response.status(200).json({
					postId,
					username: userData?.data?.username,
				});
			} catch (error) {
				response.status(500).end("Error in parsing images");
			}
		}
	}
);

const parseFilesAndFields = (
	files: formidable.Files,
	fields: formidable.Fields
) => {
	if (!files["images"]) throw "No files uploaded!";
	if (!fields.data) throw "No image data!";

	// Normalise files into a list
	const fileList = Array.isArray(files["images"])
		? files["images"]
		: [files["images"]];

	const zippedFiles = Object.values(fileList).map((file, i) => {
		if (!fields.data[i]) {
			throw "File doesnt have any data";
		}
		const data = JSON.parse(fields.data[i]) as ImageData;

		return {
			file,
			metadata: (fields.metadata && fields.metadata[i]
				? JSON.parse(fields.metadata[i])
				: {}) as ImageMetadata,
			caption:
				fields.caption && fields.caption[i]
					? (fields.caption[i] as string)
					: "",
			altText:
				fields.altText && fields.altText[i]
					? (fields.altText[i] as string)
					: "",
			data,
		};
	});
	return zippedFiles;
};

// RESIZE IMAGES THAT ARE TOO LARGE
// if (file.size >= MAX_FILE_SIZE) {
// 	const newWidth = Math.floor(
// 		(data.width * MAX_FILE_SIZE) / file.size
// 	);
// 	const resizedImage = await sharp(file.filepath)
// 		.resize({
// 			width: newWidth,
// 			fit: "contain",
// 			withoutEnlargement: true,
// 		})
// 		.jpeg({ quality: 80 })
// 		.toBuffer();
// 	console.log(resizedImage.byteLength, file.size);
// }

export default handler;
