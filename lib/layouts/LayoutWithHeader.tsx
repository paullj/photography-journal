import Header from '@/components/Header'
import Layout from '@/layouts/DefaultLayout';

import { PropsWithChildren } from 'react'

const LayoutWithHeader = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className='pt-16'>
				<div className='fixed inset-x-0 top-0 z-20'>
					<Header />
				</div>
				<Layout>
					{children}
				</Layout>
			</div>
		</>
	);
}

export default LayoutWithHeader;