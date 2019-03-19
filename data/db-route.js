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

router.get('/:id', (req, res) => {
	const { id } = req.params;
	db.findById(id)
		.then(user => {
			if (user) {
				res.status(200).json(user);
			} else {
				res
					.status(404)
					.json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The user information could not be retrieved.' });
		});
});

router.post('/', (req, res) => {
	const userInfo = req.body;
	if (!userInfo.name || !userInfo.bio) {
		res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
		return;
	}
	db.insert(userInfo)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.status(500).json({
				error: 'There was an error while saving the user to the database',
			});
		});
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
