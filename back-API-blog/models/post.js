const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    ID: {
        type: String,
        required: true,
    },
    TITLE: {
        type: String,
        required: true,
    },
    BODY: {
        type: String,
        required: true,
    },
    AUTHOR_USERNAME: {
        type: String,
        required: true,
    },
    AUTHOR_ID: { 
        type: String, 
        required: true,
    },
    TIMESTAMP: {
        type: String,
        required: true,
    },
    LIKES: {
        type: Array,
        required: false,
    },
    COMMENTS: {
        type: Array,
        required: false
    },
    WORDS: {
        type: Number,
        required: true
    }
}, { collection: 'Posts' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('Post', postsSchema, 'Posts');
