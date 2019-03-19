import React from 'react';
import { Link } from 'react-router-dom';

const PostList = props => {
	return (
		<>
			{props.posts.map(post => (
				<Link key={post.id} to={`/post/${post.id}`}>
					{post.title}
				</Link>
			))}
		</>
	);
};

export default PostList;
