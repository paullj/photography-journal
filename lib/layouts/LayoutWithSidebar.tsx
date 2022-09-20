import Footer from '@/components/Footer';
import Button from '@/components/shared/Button';
import { ResetIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

import { JSXElementConstructor, PropsWithChildren, ReactElement } from 'react'

const Header = (props: PropsWithChildren) => null;
const Sidebar = (props: PropsWithChildren) => null;
const Body = (props: PropsWithChildren) => null;

type Child = ReactElement<any, string | JSXElementConstructor<any>>;

const LayoutWithSidebar = ({ children }: PropsWithChildren) => {
	let reactChildren = React.Children.toArray(children) as Child[];

	const header = reactChildren?.find(el => el.type === Header)
	const sidebar = reactChildren?.find(el => el.type === Sidebar)
	const body = reactChildren?.find(el => el.type === Body)

	return (
		<>
			<div className='flex flex-col h-full'>
				<main className="flex-1 w-full">
					<div className='grid gap-4 md:grid-rows-[auto,1fr] md:grid-cols-[auto,1fr] grid-cols-1'>
						<div className='order-1 md:row-span-2 md:order-0'>
							<div className='px-1 py-2 space-y-4 sm:space-y-12'>
								<Link href="/">
									<a>
										<Button>
											<ResetIcon></ResetIcon>
										</Button>
									</a>
								</Link>
								{sidebar ? (
									<div className=''>
										{sidebar.props.children}
									</div>
								) : null}
							</div>
						</div>

						<div className='order-0 md:order-1'>
							{header ? header.props.children : null}
						</div>

						<div className='order-2 md:order-2'>
							{body ? body.props.children : null}
						</div>
					</div>
				</main>
				<div className='flex-shrink mt-24 mb-8'>
					<Footer />
				</div >
			</div >
		</>
	);
}

LayoutWithSidebar.Header = Header
LayoutWithSidebar.Sidebar = Sidebar
LayoutWithSidebar.Body = Body

export default LayoutWithSidebar;