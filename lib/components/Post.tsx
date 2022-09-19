import { ImageData, ImageMetadata } from "@/models/image";
import Image from "next/image";
import ImageMetadataComponent from "./ImageMetadata";

type PostProps = ImageData & ImageMetadata & { onClick?: () => void };

const Post = ({ width, height, caption, altText, url, onClick, ...metadata }: PostProps) => {
	return (
		<div className="">
			<button className="relative w-full h-full" type="button" onClick={onClick}>
				<Image src={url} alt={altText} width={width} height={height} layout="responsive" />
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
