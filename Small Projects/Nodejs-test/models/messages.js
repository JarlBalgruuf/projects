const mongoose = require('mongoose');

const Schema = mongoose.Schema


const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        //required: true
    }
},{
    timestamps: true
});


const messageSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        /*
        data: Buffer,
        contentType: String
        */
        type: String
    },
    category: {
        type: String,
        default: "default"
    },
    comments: [commentSchema]
},{
    timestamps: true
});

var Messages = mongoose.model('Message', messageSchema);
module.exports = Messages;