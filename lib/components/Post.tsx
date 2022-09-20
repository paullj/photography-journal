import { ImageData, ImageMetadata } from "@/models/image";
import Image from "next/future/image";
import ImageMetadataComponent from "./ImageMetadata";

type PostProps = ImageData & ImageMetadata & { onClick?: () => void };

const Post = ({ width, height, caption, altText, url, placeholderUrl, onClick, ...metadata }: PostProps) => {
	return (
		<div className="">
			<button className="relative w-full h-full" type="button" onClick={onClick}>
				<Image className="w-full h-auto" sizes="100vw" placeholder="blur" blurDataURL={placeholderUrl} width={width} height={height} alt={altText || ""} src={url} />
			</button>
			<div className="flex flex-col mt-2 sm:flex-row">
				<div className="flex-grow text-gray-500">
					<p className="w-full h-full text-sm text-left align-middle">{caption}</p>
				</div>
				<div className="flex-shrink-0 px-1 text-left sm:text-right">
					<ImageMetadataComponent {...metadata} />
				</div>
			</div>
		</div >
	);
};

export default Post;
