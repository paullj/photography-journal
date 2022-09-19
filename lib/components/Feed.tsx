import Grid from './shared/Grid';
import FeedPost from './FeedPost';

import type { PostData } from '@/models/post';

interface FeedProps {
	posts: PostData[]
}

const Feed = ({ posts }: FeedProps) => {
	return (
		<div className='sm:px-2'>
			<Grid>
				{posts.map((props, i) => (
					<FeedPost {...props} key={i} />
				))}
			</Grid>
		</div>
	);
}
export default Feed;