import { convertToLocalDate } from '@/utils/convertToLocalTime';

import Image from 'next/image';
import Link from 'next/link';

import type { PostData } from '@/models/post';

interface PostCardProps extends PostData { };

const FeedPost = ({ id, title, createdAt, author, images }: PostCardProps) => {
	const publishedAt = convertToLocalDate(new Date(createdAt));
	const authorUrl = `/@${author.username}/`;
	const postUrl = `${authorUrl}/${id}`;

	return (
		<div className="">
			<div className='flex justify-between mb-1 text-xs px-0.5'>
				<Link href={authorUrl}>
					<a className="text-xs text-gray-400 hover:underline hover:text-gray-600">
						{author.name}
					</a>
				</Link>
				<Link href={postUrl}>
					<a className="text-right text-gray-400 hover:underline">
						{publishedAt}
					</a>
				</Link>
			</div>

			<Link href={postUrl}>
				<a className="overflow-hidden rounded-sm" >
					<Image width={images[0].width} height={images[0].height} layout="responsive" alt={images[0].altText} src={images[0].url} />
				</a>
			</Link>

			<div className='px-0.5'>
				<Link href={postUrl}>
					<a className='pt-1 text-sm text-center text-gray-400 hover:text-gray-600 hover:underline'>
						{title}
					</a>
				</Link>
			</div>
		</div >
	);
}
export default FeedPost;