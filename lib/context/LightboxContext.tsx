import { createContext, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftIcon, ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';

import type { KeyboardEvent, PropsWithChildren } from 'react';
import type { ImageData } from '@/models/image';

interface LightboxContextProps {
	images: ImageData[]
}

export const LightboxContext = createContext({
	openModal: (index?: number) => { },
	closeModal: () => { },
});

export const LightboxContextProvider = ({ children, images }: PropsWithChildren<LightboxContextProps>) => {
	let [index, setIndex] = useState(0)
	let [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}

	const openModal = (newIndex: number = 0) => {
		if (newIndex)
			setIndex(newIndex);

		setIsOpen(true);
	}

	const previousImage = () => {
		if (index > 0)
			setIndex(index - 1)
	}

	const nextImage = () => {
		if (index < (images?.length ?? 0) - 1)
			setIndex(index + 1)
	}

	const keyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.code === "ArrowLeft") {
			previousImage();
		}

		if (event.code === "ArrowRight") {
			nextImage();
		}
	};

	return (
		<LightboxContext.Provider value={{ openModal, closeModal }}>
			<>
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog as="div" className="relative z-10" onClose={closeModal}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<div className="fixed inset-0 bg-black bg-opacity-95" />
						</Transition.Child>

						<div className="fixed inset-0 h-full overflow-hidden" onKeyDown={keyDownHandler}>
							<div className="h-full">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95">

									<Dialog.Panel className="relative flex h-full text-gray-500 transition-all transform ">
										<div className="relative w-full h-full max-h-screen shadow-xl max-w-screen">
											{images && images[index] ?
												<Image src={images[index].url} alt={images[index].altText} layout="fill" objectFit='contain' /> :
												<></>
											}

											<div className='absolute bottom-0 right-0 z-20 flex p-2'>
												<button onClick={previousImage} className="px-2">
													<ArrowLeftIcon className='w-6 h-6' />
												</button>
												<div className='w-12'>
													{index + 1}/{images?.length ?? 0}
												</div>
												<button onClick={nextImage} className="px-2">
													<ArrowRightIcon className='w-6 h-6' />
												</button>
												<button
													type="button"
													className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
													onClick={closeModal}>
													<Cross1Icon className='w-6 h-6' />
												</button>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>

				{children}
			</>
		</LightboxContext.Provider>
	)
}
