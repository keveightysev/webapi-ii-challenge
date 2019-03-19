import React from 'react';

import axios from 'axios';

import { Route } from 'react-router-dom';

import PostList from './components/PostList';

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

	render() {
		return (
			<div>
				<h1>A BLOG!!!!</h1>
				<Route
					path='/'
					render={props => <PostList {...props} posts={this.state.posts} />}
				/>
			</div>
		);
	}
}

export default App;
