// Imports 
// Async Handler
const asyncHandler = require("express-async-handler")
// Schemes
const Comments = require("../models/comment")
const Posts = require("../models/post")
const Users = require("../models/user")
// UUID v4
const { v4: uuidv4 } = require('uuid');

// Controller 
// CREATE new post //
exports.create_post = asyncHandler(async (req, res, next) => {
    // REQUIREMENTS - body.title, body.body
    try {
        const title = req.body.title
        const body = req.body.body
        // get user from user id (send by auth midW)
        const userID = req.userId
        console.log('user id is:' + userID)
        const user = await Users.findOne({ ID: userID });
        const newPost = new Posts({
            ID: "PID" + uuidv4(),
            TITLE: title,
            BODY: body,
            AUTHOR_USERNAME: user.USERNAME,
            AUTHOR_ID: user.ID,
            TIMESTAMP: new Date(),
        })
        newPost.save();
        return res.status(200).json({ msg: 'Post created succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ msg: "Couldn't post new post" })
    }
});

// GET spesific post //
exports.get_post = asyncHandler(async (req, res, next) => {
    // REQUIREMENTS - body.postID
    try {
        const postID = req.body.postID;
        const post = await Posts.findOne({ ID: postID });
        if (!post) {
            return res.status(404).json({ msg: "Post not found" })

        }
        return res.status(200).json({ post });

    } catch (err) {
        console.error(err)
        return res.status(500)
    }
});

// GET all posts
exports.get_all_post = asyncHandler(async (req, res, next) => {
    try {
        const allPostsFromAPI = await Posts.find();
        return res.status(200).json({ allPostsFromAPI })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ mag: "Database Error" });
    }
})

// DELETE post //
exports.delete_post = asyncHandler(async (req, res, next) => {
    // REQUIREMENTS - body.postID
    try {
        const postID = req.body.postID;
        const postToDelete = await Posts.findOne({ ID: postID });
        const userID = req.userId;
        if (userID === postToDelete.AUTHOR_ID) {
            await Posts.deleteOne({ ID: postID });
            res.status(200).json({ msg: 'Post deleted' })
        } else {
            res.status(400).json({ msg: "you dont have permission to delete this post" })
        }
    } catch (err) {
        console.error(err)
        res.status(500)
    }
});

// UPDATE post //
exports.update_post = asyncHandler(async (req, res, next) => {
    // REQUIREMENTS - body.postID, body.updatedBody, body.updatedTitle
    try {
        const postID = req.body.postID;
        // verify that userID is same as author_ID
        const postToEdit = await Posts.findOne({ ID: postID });
        const userID = req.userId
        if (!postToEdit) {
            return res.status(404).json({ msg: "Post not found" });
        }
        if (postToEdit.AUTHOR_ID !== userID) {
            return res.status(403).json({ msg: "You are not authorized to edit this post" });
        }
        const updatedTitle = req.body.updatedTitle
        const updatedBody = req.body.updatedBody
        await Posts.updateOne({ ID: postID }, { $set: { BODY: updatedBody, TITLE: updatedTitle } });
        return res.status(200).json({ msg: 'Post Updated succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ msg: "Couldn't Update post" })
    }
});