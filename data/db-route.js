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

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id)
		.then(deleted => {
			if (deleted) {
				res.status(204).end();
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: 'The user could not be removed' });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const updateUser = req.body;
	if (!updateUser.name || !updateUser.bio) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
		return;
	}
	db.update(id, updateUser)
		.then(updated => {
			if (updated === 0) {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			} else {
				res.status(200).json(updated);
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The user information could not be modified.' });
		});
});

module.exports = router;
