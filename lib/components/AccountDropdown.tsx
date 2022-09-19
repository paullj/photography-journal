import { Menu, Transition } from '@headlessui/react'
import { useSessionContext } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { Fragment } from "react";
import Avatar from "./shared/Avatar";

const AccountDropdown = () => {
	const { isLoading, session, error, supabaseClient } = useSessionContext();
	const router = useRouter();

	const handleSignOut = () => {
		supabaseClient.auth.signOut();
		router.push('/');
	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="">
					<Avatar></Avatar>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 w-56 mt-8 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="px-1 py-1 mt-2 ">
						<Menu.Item>
							{({ active }) => (
								<Link href={`#`}>
									<button
										className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
											} group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
									>
										@username
									</button>
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
										} group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
								>
									Settings
								</button>
							)}
						</Menu.Item>
					</div>
					<div className="px-1 py-1 mt-4">
						<Menu.Item>
							{({ active }) => (
								<button onClick={handleSignOut}
									className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
										} group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
								>
									Sign out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default AccountDropdown;