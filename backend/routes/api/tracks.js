const express = require('express');
const { check } = require("express-validator");
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const { Track } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const {
    singleMulterUpload,
    singlePublicFileUpload,
    multipleMulterUpload,
    multiplePublicFileUpload,
} = require("../../awsS3");

const router = express.Router();

// Upload new track
router.post(
    '/',
    singleMulterUpload('audio'),
    asyncHandler(async (req, res) => {
    console.log('BACKEND ROUTE', req.file);
    const { title, description, trackFile, imageUrl, userId, genreId } = req.body;


    const awsUrl = await singlePublicFileUpload(req.file);

    const track = Track.build({
        title,
        description,
        imageUrl,
        awsUrl,
        userId,
        genreId,
    });

	if(track) {
		return res.json({ track });
	}
	else return res.json({});
}));

module.exports = router;
