const express = require('express');

const db = require('./db.js');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const posts = await db.find();
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({
			message: 'The posts information could not be retrieved.',
		});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const post = await db.findById(req.params.id);

		if (post) {
			res.status(200).json(post);
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ error: 'The post information could not be retrieved.' });
	}
});

router.post('/', async (req, res) => {
	if (!req.body.title || !req.body.contents) {
		res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.',
		});
		return;
	}
	try {
		const post = await db.insert(req.body);
		const newPost = await db.findById(post.id);
		res.status(201).json(newPost);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: 'There was an error while saving the post to the database',
		});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const postDelete = await db.remove(req.params.id);
		if (postDelete > 0) {
			res.status(200).end();
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'The post could not be removed' });
	}
});

router.put('/:id', async (req, res) => {
	if (!req.body.title || !req.body.contents) {
		res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.',
		});
		return;
	}
	try {
		const post = await db.update(req.params.id, req.body);
		const updatedPost = await db.findById(post);
		if (post) {
			res.status(200).json(updatedPost);
		} else {
			res
				.status(404)
				.json({ message: 'The post with the specified ID does not exist.' });
		}
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ error: 'The post information could not be modified.' });
	}
});

module.exports = router;
