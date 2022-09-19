import { PostData } from "./post";

interface UserData {
	id: string;
	name: string;
	username: string;
}

interface UserWithPosts extends UserData {
	posts: PostData[];
}

export type { UserData, UserWithPosts };
