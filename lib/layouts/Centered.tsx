import Layout from '@/layouts/DefaultLayout';

import { PropsWithChildren } from 'react'

const Centered = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Layout>
				<div className='flex items-center w-full h-full p-2 mx-auto sm:max-w-md'>
					<div className='w-full'>
						{children}
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Centered;