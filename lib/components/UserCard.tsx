import Avatar from './shared/Avatar';
import type { UserData } from '@/models/user';
import Link from 'next/link';

interface UserCardProps extends Partial<UserData> { }

const UserCard = ({ name, username }: UserCardProps) => {
	return (
		<div className='space-x-2'>
			<Link href={`/@${username}`}>
				<a>
					<Avatar></Avatar>
				</a>
			</Link>
			<div className='inline-block leading-none'>
				<div>
					<Link href={`/@${username}`}>
						<a className='text-base text-gray-900 hover:text-black hover:underline'>
							{name}
						</a>
					</Link>
				</div>
				<div>
					<Link href={`/@${username}`}>
						<a className='text-xs text-gray-400 hover:text-gray-600 hover:underline'>
							@{username}
						</a>
					</Link>
				</div>
			</div>
		</div >
	);
}
export default UserCard;