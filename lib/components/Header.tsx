import AccountDropdown from '@/components/AccountDropdown';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';

const Header = () => {
	const user = useUser()

	return (
		<header className='flex items-center justify-between h-12 px-8 space-x-2 text-sm bg-white dark:bg-black'>
			<div className='flex justify-start flex-grow basis-0'>

			</div>
			<div className='text-center'>

			</div>
			<div className='flex-grow text-right basis-0'>
				<div className="flex items-center justify-end space-x-6">
					{user ?
						<>
							<Link href="/new">
								<a className='hover:underline'>New Post</a>
							</Link>
							<AccountDropdown />
						</> :
						<>
							<Link href="/login">
								<a className='hover:underline'>Login</a>
							</Link>
						</>
					}
				</div>
			</div>
		</header >
	)
}

export default Header;