const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    ID: {
        type: String,
        required: true,
    },
    USERNAME: {
        type: String,
        required: true,
    },
    PASSWORD: {
        type: String,
        required: true,
    },
    EMAIL: {
        type: String,
        required: true,
    },
    FIRST_NAME: {
        type: String,
        required: false,
    },
    LAST_NAME: {
        type: String,
        required: false,
    },
    POSTS: {
        type: Array,
        required: false
    },
    COMMENTS: {
        type: Array,
        required: false
    },
    IP_ADDRESSES: {
        type: Array,
        required: false
    },
}, { collection: 'Users' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('User', usersSchema, 'Users');
