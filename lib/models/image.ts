interface ImageMetadata {
	make?: string;
	model?: string;
	lensModel?: string;
	iso?: number;
	f?: number;
	exposureTime?: number;
	shutterSpeed?: number;
	aperture?: number;
	focalLength?: number;
}

interface ImageData {
	id?: string;
	url: string;
	width: number;
	height: number;
	altText?: string;
	caption?: string;
}

export type { ImageMetadata, ImageData };
