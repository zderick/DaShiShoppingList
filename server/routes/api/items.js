const express = require('express');
const router = express.Router();

const ItemCollection = require('../../models/ItemSchema.js');

router.get('/', (req, res) => {
	ItemCollection.find()
		.sort({date : -1})
		.then(items => res.json(items));
	});

router.post('/add', (req, res) => {
	const newItem = new ItemCollection({
		name: req.body.name
	});

	newItem.save().then(item => res.json(item))
				  .catch(err => res.json(err));
	});

router.delete('/delete/:id', (req, res) => {
	ItemCollection.findByIdAndRemove(req.params.id)
	.then(item => {
		res.json({success: 'true'});
	})
	.catch(err => {
		res.status(404).json({success: 'false'});
	})
});


module.exports = router;