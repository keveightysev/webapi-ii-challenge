import React from 'react';
import { Link } from 'react-router-dom';

const PostList = props => {
	return (
		<div className='post-list'>
			{props.posts.map(post => (
				<Link key={post.id} to={`/post/${post.id}`}>
					{post.title}
				</Link>
			))}
		</div>
	);
};

export default PostList;
