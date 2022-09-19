import Footer from '@/components/Footer';

import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex flex-col h-full'>
			<main className="flex-1 w-full">
				{children}
			</main>
			<div className='flex-shrink mt-24 mb-8'>
				< Footer />
			</div >
		</div >
	);
}

export default Layout;