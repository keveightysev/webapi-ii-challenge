import React from 'react';
import moment from 'moment';
import axios from 'axios';

class Post extends React.Component {
	state = {
		updateClicked: false,
	};

	render() {
		const { id } = this.props.match.params;
		const post = this.props.posts.find(item => `${item.id}` === id);
		if (!post) {
			return <h3>Loading post...</h3>;
		}
		return (
			<div className='post'>
				<h2>{post.title}</h2>
				<p>Posted {moment(post.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow()}</p>
				<p>{post.contents}</p>
			</div>
		);
	}
}

export default Post;
