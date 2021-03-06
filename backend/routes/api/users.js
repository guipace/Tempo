const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Track, Comment, Genre } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

router.post('/', validateSignup, asyncHandler( async (req, res) => {
    const { email, firstName, lastName, websiteUrl, avatarUrl, password, username } = req.body;
    const user = await User.signup({ email, firstName, lastName, websiteUrl, avatarUrl, password, username });

    await setTokenCookie(res, user);

    return res.json({
        user,
    });
}));

router.get(
    '/:username',
    asyncHandler(async (req, res) => {

        const user = await User.findOne({
            where: {
                username: req.params.username,
            },
            // include: [ Track, Comment ]
            include: [
                {
                    model: Track,
                    include: Genre
                },
                Comment
            ]
        });

        if(user) {
            return res.json({ user });
        }
        else return res.json({});
    })

)

module.exports = router;
