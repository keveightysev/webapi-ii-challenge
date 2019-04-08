import React from 'react';
import axios from 'axios';

class AddPost extends React.Component {
	state = {
		title: '',
		contents: '',
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	addPost = async e => {
		e.preventDefault();
		const newPost = {
			title: this.state.title,
			contents: this.state.contents,
		};
		const res = await axios.post('http://localhost:4000/api/posts/', newPost);
		this.props.updateParent();
		this.setState({ title: '', contents: '' });
		this.props.history.push(`/post/${res.data[0].id}`);
	};

	render() {
		return (
			<div className='post'>
				<h2>Add a new post</h2>
				<form onSubmit={this.addPost}>
					<div>
						<label htmlFor='title'>Post Title: </label>
						<input
							type='text'
							value={this.state.title}
							onChange={this.handleChange}
							name='title'
							id='title'
						/>
					</div>
					<div>
						<label htmlFor='contents'>Post:</label>
						<textarea
							name='contents'
							id='contents'
							value={this.state.contents}
							onChange={this.handleChange}
						/>
					</div>
					<button>Add Post</button>
				</form>
			</div>
		);
	}
}

export default AddPost;
