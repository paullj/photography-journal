import { convertToLocalTime } from '@/utils/convertToLocalTime';

interface PostInfoProps {
	title: string;
	createdAt: string;
}

const PostInfo = ({ title, createdAt }: PostInfoProps) => {
	const publishedAt = convertToLocalTime(new Date(createdAt ?? ""));

	return (
		<div className='mt-4'>
			<div className='block'>
				{title}
			</div>
			<time className='block text-xs text-gray-500 '>
				Published {publishedAt}
			</time>
		</div>
	);
}
export default PostInfo;