const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    ID: {
        type: String,
        required: true,
    },
    POST_ID: { 
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
}, { collection: 'Comments' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('Comment', commentsSchema, 'Comments');
