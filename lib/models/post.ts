import { ImageData } from "./image";
import { UserData } from "./user";

interface PostData {
	id: string;
	title: string;
	status?: "uploading" | "done" | "error";
	createdAt: string;
	updatedAt: string;
	images: ImageData[];
	author: UserData;
}

export type { PostData };
