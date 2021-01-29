const express = require('express');
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const { Genre } = require('../../db/models');

const router = express.Router();

// Get all genres
router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.findAll();

	if(genres) {
		return res.json({ genres });
	}
	else return res.json({});
}));

module.exports = router;
