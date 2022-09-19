import exifr from "exifr";

const parseSize = async (file: File) => {
	const bitmap = await createImageBitmap(file);
	const { width, height } = bitmap;
	bitmap.close();
	return {
		width,
		height,
		url: URL.createObjectURL(file),
	};
};

const parseMetadata = (file: File) => {
	return exifr
		.parse(file, {
			pick: ["Model", "LensModel", "ISO", "FNumber", "ExposureTime"],
		})
		.then((metadata) => {
			return {
				model: metadata?.["Model"] ?? undefined,
				lensModel: metadata?.["LensModel"] ?? undefined,
				iso: metadata?.["ISO"] ?? undefined,
				f: metadata?.["FNumber"] ?? undefined,
				exposureTime: metadata
					? 1 / metadata?.["ExposureTime"] ?? undefined
					: undefined,
			};
		});
};

export { parseMetadata, parseSize };
