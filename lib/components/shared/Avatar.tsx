import { ReactNode } from 'react';

interface AvatarProps {
	children?: ReactNode;
}

const Avatar = ({ children }: AvatarProps) => (
	<div className="relative inline-block w-8 h-8 overflow-hidden border border-gray-200 rounded-full">
		<div className="absolute w-full h-full bg-cover border-inherit">
			{children}
		</div>
		<div className='inset-0 w-full h-full bg-gradient-to-br from-cyan-200 to-pink-300 ' />
	</div>
);


export default Avatar;