const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    isBlog: Boolean,
    publisherId: String,
    writtenBy: String,
    postDate: Date,
    blogText: String,
    imageUrls: [],
    videoUrls: [],
    pesentationUrls: []
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);