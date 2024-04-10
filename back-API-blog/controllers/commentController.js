// Imports 
// Async Handler
const asyncHandler = require("express-async-handler")
// Schemes
const Comments = require("../models/comment")
const Posts = require("../models/post")
const Users = require("../models/user")
// UUID v4
const { v4: uuidv4 } = require('uuid');

// COMMENTS CONTROLLER //
// New comment 
exports.post_comment = asyncHandler(async (req, res, next) => {
    console.log("posting comment BE")
    // get user id from req.user
    const userID = req.userId;
    const postID = req.params.id;
    const message = req.body.comment

    // Find user By ID 
    const user = await Users.findOne({ ID: userID })
    if (!user){ 
        return res.status(404).json({msg: 'user not dound by id'})
    }
    // create comment id
    const newCommentID = ('CID' + uuidv4())
    // CREATE NEW COMMENT   
    const newComment = new Comments({
        ID: newCommentID,
        POST_ID: postID,
        BODY: message,
        AUTHOR_USERNAME: user.USERNAME,
        AUTHOR_ID: userID,
        TIMESTAMP: new Date(),
    })
    newComment.save();
    console.log(newComment)
    // ADD COMMENT ID TO POST (BY ID)
    const postToUpdate = await Posts.updateOne(
        { ID: postID },
        { $push: { COMMENTS: newComment } }
    );
    return res.status(200).json({msg: 'new comment created"'})

})
