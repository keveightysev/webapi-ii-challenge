import React from 'react';

import axios from 'axios';

import { Route } from 'react-router-dom';

import PostList from './components/PostList';
import Post from './components/Post';
import AddPost from './components/AddPost';
import Blank from './components/Blank';

class App extends React.Component {
	state = {
		posts: [],
	};

	async componentDidMount() {
		try {
			const res = await axios.get('http://localhost:4000/api/posts/');
			this.setState({ posts: res.data });
		} catch (err) {
			console.log(err.message);
		}
	}

	updateParent = async () => {
		try {
			const res = await axios.get('http://localhost:4000/api/posts/');
			this.setState({ posts: res.data });
		} catch (err) {
			console.log(err.message);
		}
	};

	render() {
		return (
			<div>
				<h1>A BLOG!!!!</h1>
				<div className='posts-container'>
					<Route
						path='/'
						render={props => <PostList {...props} posts={this.state.posts} />}
					/>
					<Route path='/' exact component={Blank} />
					<Route
						path='/post/:id'
						render={props => (
							<Post
								{...props}
								posts={this.state.posts}
								updateParent={this.updateParent}
							/>
						)}
					/>
					<Route
						path='/addpost'
						render={props => (
							<AddPost {...props} updateParent={this.updateParent} />
						)}
					/>
				</div>
			</div>
		);
	}
}

export default App;
