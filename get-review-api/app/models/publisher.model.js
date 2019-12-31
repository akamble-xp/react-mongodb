const mongoose = require('mongoose');

const PublisherSchema = mongoose.Schema({
    name: String,
    blogTitle: String,
    status: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Publisher', PublisherSchema);