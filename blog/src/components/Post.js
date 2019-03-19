import React from 'react';
import moment from 'moment';
import axios from 'axios';

class Post extends React.Component {
	state = {
		updateClicked: false,
	};

	deletePost = async (e, id) => {
		e.preventDefault();
		await axios.delete(`http://localhost:4000/api/posts/${id}`);
		this.props.updateParent();
		this.props.history.push('/');
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
				<button onClick={e => this.deletePost(e, post.id)}>Delete Post</button>
			</div>
		);
	}
}

export default Post;
