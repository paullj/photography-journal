import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";
import Image from 'next/image';

import { useForm } from "react-hook-form";
import { Cross1Icon, CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import ImageMetadataComponent from '@/components/ImageMetadata';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';

import futch from '@/utils/futch';

import LayoutWithHeader from "@/layouts/LayoutWithHeader";

import type { ChangeEvent } from 'react';
import type { NextPageWithLayout } from './_app';


import type { ImageData, ImageMetadata } from '@/models/image';
import { parseMetadata, parseSize } from '@/utils/parseImage';

interface NewPostFormInput {
	title: string;
	captions: string[];
	altTexts: string[];
	files: File[];
};

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

const NewPost: NextPageWithLayout = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false)

	const [files, setFiles] = useState<File[]>([])
	const [imageDatas, setImageDatas] = useState<ImageData[]>([])
	const [metadatas, setMetadatas] = useState<ImageMetadata[]>([])

	const { register, handleSubmit } = useForm<NewPostFormInput>();

	const fileSelectHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = [...files, ...event.target.files]
			setFiles(newFiles);
		}
	}

	useEffect(() => {
		setLoading(true);

		const imageDataPromises = files.map(parseSize);
		const promises = files.map(parseMetadata);

		Promise.all(imageDataPromises)
			.then((result) => {
				setImageDatas(result);
			}).then(() =>
				Promise.all(promises)
			).then((result) => {
				setMetadatas(result);
				setLoading(false);
			})
	}, [files])

	const removeImageHandler = (index: number) => {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);

		const newImageDatas = [...imageDatas];
		newImageDatas.splice(index, 1);

		setImageDatas(newImageDatas);

		const newMetadatas = [...metadatas];
		newMetadatas.splice(index, 1);

		setMetadatas(newMetadatas);
	}

	const submitNewPost = handleSubmit(async (values) => {
		const formData = new FormData();

		if (values.title)
			formData.append("title", values.title)

		files.forEach((file) =>
			formData.append('images', file)
		)
		metadatas.forEach((metadata) =>
			formData.append('metadata[]', JSON.stringify(metadata))
		)
		imageDatas.forEach((imageData) =>
			formData.append('data[]', JSON.stringify(imageData))
		)
		values.captions.forEach((caption) =>
			formData.append('caption[]', caption)
		)
		values.altTexts.forEach((altText) =>
			formData.append('altText[]', altText)
		)
		fetch('/api/upload', {
			method: "POST",
			body: formData,
		}).then(response => response.json())
			.catch(error => console.error(error))
			.then((data) => {
				router.push(`/@${data.username}/${data.postId}`)
			})
			.catch(error => console.error(error))
	});


	return (
		<>
			<Head>
				<title>posts/new</title>
			</Head>
			<div className=''>
				<form onSubmit={submitNewPost}>
					<Input id='postTitle' label='title' type="text" className="text-lg" placeholder="Add a title" {...register("title")} />
					<div className='mt-2 space-y-4'>
						{files.map((file, i) => (
							<div key={i} className="flex flex-col xl:space-x-2 xl:flex-row">
								{imageDatas[i] && (
									<div className='w-full max-w-screen-lg'>
										<Image width={imageDatas[i].width} height={imageDatas[i].height} src={imageDatas[i].url} alt={`Uploaded image ${i}`} layout="responsive" />
									</div>
								)}
								<div className='flex flex-col mt-2 space-y-2 sm:items-center xl:items-start sm:space-x-2 xl:space-x-0 xl:mt-0 sm:space-y-0 sm:flex-row xl:flex-col'>
									<div className='sm:mr-2'>
										<Button onClick={() => removeImageHandler(i)} className='w-full text-red-900 bg-red-100 sm:w-auto hover:bg-red-200 hover:text-red-800'>
											<Cross1Icon className='w-full sm:w-auto' />
										</Button>
									</div>
									<div className='flex-grow w-full'>
										<Input id="caption" label="caption" type="text" placeholder='Enter caption' {...register(`captions.${i}`)} />
										<Input id="alt" label="alt" type="text" placeholder='Enter alternative text' {...register(`altTexts.${i}`)} />
									</div>
									<div className='flex-shrink-0 text-left justify-self-end sm:text-right xl:text-left'>
										{metadatas[i] && <ImageMetadataComponent key={i} {...metadatas[i]} />}
									</div>
								</div>
							</div>
						))}

						<label htmlFor="file-input" className="flex flex-col items-center justify-center w-full h-48 border border-gray-300 border-dashed rounded-sm cursor-pointer sm:h-64 bg-gray-50 hover:bg-gray-100 ">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, or GIF (Maximum 10MB)</p>
							</div>
							<input id="file-input" type="file" required multiple {...register("files", { required: true, onChange: fileSelectHandler })} className="hidden" accept="image/jpeg, image/png" />
						</label>
					</div>
					<div className='mt-4'>
						<Button type='submit'>
							<div className='flex items-center mx-3 space-x-1'>
								<CheckIcon className='-ml-2' />
								<p>Publish</p>
							</div>
						</Button>
					</div>
				</form>
			</div>
		</>
	)
}

NewPost.getLayout = (page) => {
	return (
		<LayoutWithHeader>
			<Link href="/">
				<Button className='text-red-900 bg-red-100 hover:bg-red-200 hover:text-red-800'>
					<TrashIcon />
				</Button>
			</Link>

			{page}
		</LayoutWithHeader >
	)
}

export default NewPost;
