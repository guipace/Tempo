const express = require('express');
// const { check } = require("express-validator");
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const { Track, User, Genre, Comment } = require('../../db/models');
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

// Edit track
router.patch(
    '/:id',
    asyncHandler(async (req, res) => {
        const { title, description, imageUrl, userId, genreId } = req.body.track;

        const track = await Track.findByPk(req.params.id);

        let updatedTrack = await track.update({
            title: title,
            description: description,
            imageUrl: imageUrl,
            userId: userId,
            genreId: genreId
        })

        if (req.file) {
            const awsUrl = await singlePublicFileUpload(req.file);
            updatedTrack = await track.update({
                awsUrl: awsUrl
            })
        }

        if(updatedTrack) {
            return res.json({ updatedTrack });
        }
        else return res.json({});
    })
);

// Delete track
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {

        await Track.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.json("Track Deleted");
}));

// Get track info
router.get(
    '/:id',
    asyncHandler(async (req, res) => {

        const track = await Track.findByPk(req.params.id,  {
            include: [
                User,
                Genre,
                {
                        model: Comment,
                        include: User
                },
            ]
        });

        if(track) {
            return res.json({ track });
        }
        else return res.json({});
    })

);

// Post comment to track
router.post(
    '/:id/comment',
    asyncHandler(async (req, res) => {
        const { content, userId } = req.body;

        const comment = await Comment.create({
            content,
            userId,
            trackId: req.params.id,
        });

        if(comment) {
            return res.json({ comment });
        }
        else return res.json({});
    })
);

// Delete comment from track
router.delete(
    '/:id/:commentId',
    asyncHandler(async (req, res) => {
        await Comment.destroy({
            where: {
                id: req.params.commentId
            }
        });

        return res.json("Comment Deleted");
    })
);

// Edit comment of track
router.patch(
    '/:id/:commentId',
    asyncHandler(async (req, res) => {
        const { content } = req.body;
        const comment = await Comment.findByPk(req.params.commentId);

        await comment.update({
            content: content
        });

        const updatedComment = await Comment.findByPk(req.params.commentId);

        if(updatedComment) {
            return res.json({ updatedComment });
        }
        else return res.json({});
    })
);


module.exports = router;
