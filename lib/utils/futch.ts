interface FutchOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	headers?: { [key: string]: string };
	withCredentials?: boolean;
	body?: Document | XMLHttpRequestBodyInit | null | undefined;
}

type ProgressCallback = (progress: number) => void;

// Adapted from: https://github.com/github/fetch/issues/89#issuecomment-256610849
const futch = (
	url: string,
	progressCallback: ProgressCallback,
	options: FutchOptions
) => {
	return new Promise<XMLHttpRequest | null>((resolve, reject) => {
		var request = new XMLHttpRequest();
		request.open(options.method || "get", url, true);
		request.withCredentials = options.withCredentials ?? false;

		if (options.headers) {
			for (var key in options.headers || {}) {
				request.setRequestHeader(key, options.headers[key]);
			}
		}

		request.onload = (event) => resolve(event.target as XMLHttpRequest);
		request.onerror = reject;

		if (request.upload && progressCallback) {
			request.upload.onprogress = (event) => {
				progressCallback(event.loaded / event.total);
			};
		}
		request.send(options.body);
	});
};

export default futch;
