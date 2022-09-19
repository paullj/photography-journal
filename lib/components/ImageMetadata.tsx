import React from 'react';
import { } from '@radix-ui/react-icons';

interface ImageMetadataProps {
	model?: string;
	lensModel?: string;
	iso?: number;
	f?: number;
	exposureTime?: number;
}

const ImageMetadata = ({ model, lensModel, iso, f, exposureTime }: ImageMetadataProps) => {
	return (
		<div className='space-y-1 text-xs xl:text-sm'>
			{model &&
				<p className=''>{model}</p>
			}
			{lensModel &&
				<p className=''>{lensModel}</p>
			}
			<div className='space-x-5'>
				<p className='inline'>
					{f && <>
						<span className='mr-0.5 font-serif italic font-thin'>f</span>{f?.toFixed(1)}
					</>}
				</p>
				{exposureTime &&
					<p className='inline'>
						1 / {exposureTime}s
					</p>
				}
				{iso &&
					<p className='inline'>
						ISO {iso}
					</p>
				}
			</div>
		</div>
	);
}
export default ImageMetadata;