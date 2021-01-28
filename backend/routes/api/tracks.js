const express = require('express');
// const { check } = require("express-validator");
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const { Track, User, Genre } = require('../../db/models');
// const { handleValidationErrors } = require('../../utils/validation');
const {
    singleMulterUpload,
    singlePublicFileUpload,
} = require("../../awsS3");
const user = require('../../db/models/user');

const router = express.Router();

// Upload new track
router.post(
    '/',
    singleMulterUpload('audio'),
    asyncHandler(async (req, res) => {
    const { title, description, imageUrl, userId, genreId } = req.body;

    const awsUrl = await singlePublicFileUpload(req.file);

    const newTrack = await Track.create({
        title,
        description,
        imageUrl,
        awsUrl,
        userId,
        genreId,
    });

	if(newTrack) {
		return res.json({ newTrack });
	}
	else return res.json({});
}));

// Get track info
router.get(
    '/:id',
    asyncHandler(async (req, res) => {

        const track = await Track.findByPk(req.params.id,  {
            include: [ User, Genre ]
        });

        if(track) {
            return res.json({ track });
        }
        else return res.json({});
    })

);


module.exports = router;
