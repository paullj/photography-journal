import {
	buildImageUrl,
	extractPublicId,
	setConfig,
} from "cloudinary-build-url";
import cloudinary from "cloudinary";

setConfig({
	cloudName: "paullj",
});

export const resizeImageUrl = ({
	url,
	width,
	height,
}: {
	url: string;
	width?: number;
	height?: number;
}) =>
	buildImageUrl(extractPublicId(url), {
		transformations: { resize: { width, height, type: "scale" } },
	});

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploader = cloudinary.v2.uploader;
