import React from 'react';
import { Link } from 'react-router-dom';

const PostList = props => {
	const addPost = e => {
		e.preventDefault();
		props.history.push('/addpost');
	};

	return (
		<div className='post-list'>
			<button onClick={addPost}>Add Post</button>
			{props.posts.map(post => (
				<Link key={post.id} to={`/post/${post.id}`}>
					{post.title}
				</Link>
			))}
		</div>
	);
};

export default PostList;
